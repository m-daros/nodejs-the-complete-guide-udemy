const { validationResult } = require ( "express-validator" );
const sequelize = require ( "../orm/sequelize/sequelize-config" );

const { OrderEntity, ProductEntity, OrderProductEntity } = require ( "../orm/sequelize/model/sequelize-orm-model" );
const webSocket = require ( "../websocket/websocket.js" );

exports.addOrder = async ( request, response, next ) => {

    try {

        // TODO TMP
        console.log ( `BODY STRINGIFIED: ${JSON.stringify ( request.body )}` );

        const orderToCreate = request.body;
        orderToCreate.date = new Date ();

        // TODO recuperare dal body l'ordine (con i relativi OrderItemEntity
        const errors = validationResult ( request );

        if ( ! errors.isEmpty () ) {

            // TODO ...
            console.log ( "VALIDATION KO !!!" );
            response.status ( 400 );
            response.json ( { errors: errors.array () } );
        }
        else {

            const transaction = await sequelize.transaction ();

            const order = await OrderEntity.create ( orderToCreate, { transaction: transaction } );

            // TODO CICLARE SU TUTTI I PRODOTTI

            // TODO EVITARE findByPk esplicito
            // const product0 = await ProductEntity.findByPk ( orderToCreate.products [0].order_product.productId, { transaction: transaction } );
            // const product1 = await ProductEntity.findByPk ( orderToCreate.products [1].order_product.productId, { transaction: transaction } );
            //
            // await order.addProduct ( product0, {
            //     through: { quantity: orderToCreate.products [0].order_product.quantity }, transaction
            // }, { transaction: transaction } );
            //
            // await order.addProduct ( product1, {
            //     through: { quantity: orderToCreate.products [1].order_product.quantity }, transaction
            // }, { transaction: transaction } );

            const promises = [];

            orderToCreate.products.forEach ( product => {

                const addProductPrimise = addProductToOrder ( product, transaction, order );
                promises.push ( addProductPrimise );
            } );

            Promise.all ( promises )
                .then ( async results => {

                    await transaction.commit ();

                    // Emit an event to the "topic" orders
                    await webSocket.getSocketIO ().emit ( "orders", { action: "create", data: order } );

                    response.status ( 201 )
                        .json ( order );
                } );
        }
    } catch ( error )  {

        // TODO Definire data model comune degli errors
        console.log ( `ERROR: ${error}`)
        response.status ( 500 )
            .json ( { message: `Unable to save order: TODO IMPROVE MESSAGE` } ); // TODO IMPROVE MESSAGE
    }
};

exports.getOrders = ( request, response, next ) => {

    // TODO get customerId from the logged user
    OrderEntity.findAll ( { where: { customerId: 1 }, include: ProductEntity } )
        .then ( orders => {

            response.status ( 200 )
                .json ( orders );
        } )
        .catch ( error => {

            // TODO data model degli errori
            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( "Unable to show orders" );
        } );
};

exports.getOrder = ( request, response, next ) => {

    const orderId = parseInt ( request.params.orderId , 10 );

    OrderEntity.findByPk ( orderId, { include: ProductEntity } )
        .then ( order => {

            if ( ! order ) {

                console.error ( `Unable to find order with id ${orderId}` );

                // TODO USARE DATA MODEL DEGLI ERRORI
                response.status ( 404 )
                    .json ( { message: `Unable to find order with id ${orderId}` } )
            }
            else {

                response.status ( 200 )
                    .json ( order );
            }
        } )
        .catch ( error => {

            // TODO DATA MODEL COMUNE DEGLI ERRORI
            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( `Unable to show order with id ${orderId}` );
        } );
};

const addProductToOrder = async ( product, transaction, order ) => {

    const foundProd = await ProductEntity.findByPk ( product.order_product.productId, { transaction: transaction } )

    return order.addProduct ( foundProd, {

        through: { quantity: product.order_product.quantity }, transaction
    }, { transaction: transaction } )
}