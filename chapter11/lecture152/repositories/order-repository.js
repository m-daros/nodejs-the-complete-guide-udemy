// TODO Forse lo strato di repository è inutile, farebbe da passacarte al model definito da sequelize --> Il model sequelize potrebbe essere visto come repository
const { OrderEntity, ProductEntity } = require ( "../orm/sequelize/model/sequelize-orm-model.js" );

// exports.addOrder = ( order ) => {
//
// //        return order.save ()
//         return OrderEntity.create ( ( { date: order.date, customerId: order.customerId } ) )
//             .then ( savedOrder => {
//
//                 savedOrder.addProduct ( order.getProducts (), { through: { quantity: 2 } } ); // TODO ...
//             } )
//             .catch ( error => {
//
//                 const message = `Unable to add order. Error: ${error}`;
//                 console.log ( message )
//                 return Promise.reject ( message );
//             } );
// };

exports.getOrdersByCustomer = ( customerId ) => {

    return OrderEntity.findAll ( { where: {

                customerId: customerId
            }
        } )
        .then ( orders => {

            return Promise.resolve ( orders );
        } )
        .catch ( error => {

            const message = `Unable to get orders for customer ${customerId}. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.deleteOrder = ( orderId ) => {

    return OrderEntity.destroy ( {

            where: { id: orderId },
            truncate: false
        } )
        .then ( () => {

            Promise.resolve ();
        } )
        .catch ( error => {

            const message = `Unable to delete order with id ${orderId}. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } )
};

exports.getOrder = ( orderId ) => {

    // Eager fetch of related entities
    return OrderEntity.findByPk ( orderId, { include: ProductEntity } )
        .then ( product => {

            return Promise.resolve ( product );
        } )
        .catch ( error => {

            const message = `Unable to get order with id: ${orderId}. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};