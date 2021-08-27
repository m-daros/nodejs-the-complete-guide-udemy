const { validationResult } = require ( "express-validator" )

const sequelize = require ( "../orm/sequelize/sequelize-config" )
const { OrderEntity, ProductEntity } = require ( "../orm/sequelize/model/sequelize-orm-model" )
const webSocket = require ( "../websocket/websocket" )
const { AppError, ErrorType, logError } = require ( "../model/error-model" )

exports.addOrder = async ( request, response, next ) => {

    try {

        const orderToCreate = request.body
        orderToCreate.date = new Date ()

        const errors = validationResult ( request )

        if ( ! errors.isEmpty () ) {

            const appError = new AppError ( ErrorType.VALIDATION_ERROR, "Unable to add order due to validation error" )
            logError ( appError, `Unable to add order due to validation error` )

            response.status ( 400 ).json ( appError )
        }
        else {

            const order = await saveOrder ( orderToCreate )

            // Emit an event to the "topic" orders
            await webSocket.getSocketIO ().emit ( "orders", { action: "create", data: order } )

            response.status ( 201 ).json ( order )
        }
    }
    catch ( error )  {

        const appError = new AppError ( ErrorType.APPLICATION_ERROR, "Unable to add the order" )
        logError ( appError, `Unable to add order due to error ${error}` )

        response.status ( 500 ).json ( appError )
    }
};

exports.getOrders = async ( request, response, next ) => {

    try {

        // TODO get customerId from the logged user
        const orders = await OrderEntity.findAll ( { where: { customerId: 1 }, include: ProductEntity } )

        response.status ( 200 ).json ( orders )

    }
    catch ( error ) {

        const appError = new AppError ( ErrorType.APPLICATION_ERROR, "Unable to get orders" )
        logError ( appError, `Unable to get orders due to error ${error}` )

        response.status ( 500 ).json ( appError )
    }
};

exports.getOrder = async ( request, response, next ) => {

    const orderId = parseInt ( request.params.orderId , 10 )

    try {

        const order = OrderEntity.findByPk ( orderId, { include: ProductEntity } )

        if ( ! order ) {

            const appError = new AppError ( ErrorType.RESOURCE_NOT_FOUND_ERROR, `Unable to find the order with id ${orderId}` )
            logError ( appError, `Unable to find the order with id ${orderId}` )

            response.status ( 404 ).json ( appError )
        }
        else {

            response.status ( 200 ).json ( order )
        }
    }
    catch ( error ) {

        const appError = new AppError ( ErrorType.APPLICATION_ERROR, `Unable to find the order with id ${orderId}` )
        logError ( appError, `Unable to find the order with id ${orderId} due to error ${error}` )

        response.status ( 500 ).json ( appError )
    }
}

const saveOrder = async ( orderToCreate ) => {

    const transaction = await sequelize.transaction ()

    try {

        const order = await OrderEntity.create ( orderToCreate, { transaction: transaction } )
        const promises = []

        orderToCreate.products.forEach ( product => {

            promises.push ( addProductToOrder ( product, order, transaction ) )
        } )

        await Promise.all ( promises )

        await transaction.commit ()

        return order
    }
    catch ( error ) {

        transaction.rollback ()
        throw error
    }
}

const addProductToOrder = async ( product, order, transaction ) => {

    // Doesn't work if we add the product received from the request body, so as workaround we find the product doing a DB query
    const foundProd = await ProductEntity.findByPk ( product.order_product.productId, { transaction: transaction } )

    return order.addProduct ( foundProd, { through: { quantity: product.order_product.quantity }, transaction } )
}