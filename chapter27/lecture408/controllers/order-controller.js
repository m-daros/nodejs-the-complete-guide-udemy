const { validationResult } = require ( "express-validator" );
const sequelize = require ( "../orm/sequelize/sequelize-config" );

const { OrderEntity, ProductEntity } = require ( "../orm/sequelize/model/sequelize-orm-model" );
const webSocket = require ( "../websocket/websocket.js" );

exports.addOrder = async ( request, response, next ) => {

    try {

        const orderToCreate = request.body;
        orderToCreate.date = new Date ();

        const errors = validationResult ( request );

        if ( ! errors.isEmpty () ) {

            // TODO Introduce common error model
            console.log ( "VALIDATION KO !!!" );
            response.status ( 400 );
            response.json ( { errors: errors.array () } );
        }
        else {

            const transaction = await sequelize.transaction ();
            const order = await OrderEntity.create ( orderToCreate, { transaction: transaction } );
            const promises = [];

            orderToCreate.products.forEach ( product => {

                promises.push ( addProductToOrder ( product, order, transaction ) );
            } );

            await Promise.all ( promises );

            await transaction.commit ();

            // Emit an event to the "topic" orders
            await webSocket.getSocketIO ().emit ( "orders", { action: "create", data: order } );

            response.status ( 201 )
                .json ( order );
        }
    } catch ( error )  {

        // TODO Introduce common error model
        console.log ( `ERROR: ${error}`)
        response.status ( 500 )
            .json ( { message: `Unable to save order: TODO IMPROVE MESSAGE` } );
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

            // TODO Introduce common error model
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

                // TODO Introduce common error model
                response.status ( 404 )
                    .json ( { message: `Unable to find order with id ${orderId}` } )
            }
            else {

                response.status ( 200 )
                    .json ( order );
            }
        } )
        .catch ( error => {

            // TODO Introduce common error model
            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( `Unable to show order with id ${orderId}` );
        } );
};

const addProductToOrder = async ( product, order, transaction ) => {

    // Doesn't work if we add the product received from the request body, so as workaround we find the product doing a DB query
    const foundProd = await ProductEntity.findByPk ( product.order_product.productId, { transaction: transaction } )

    return order.addProduct ( foundProd, { through: { quantity: product.order_product.quantity }, transaction } );
}