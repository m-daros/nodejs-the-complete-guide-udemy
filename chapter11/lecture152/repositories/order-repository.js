// TODO Forse lo strato di repository è inutile, farebbe da passacarte al model definito da sequelize --> Il model sequelize potrebbe essere visto come repository
const OrderEntity = require ( "../orm/sequelize/model/order-entity.js" );

const relations = require ( "../orm/sequelize/model/relations.js" );

exports.addOrder = ( order ) => {

        return order.save ()
        .catch ( error => {

            const message = `Unable to add order. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.getOrdersByCustomer = ( customerId ) => {

    return CustomerEntity.findAll ( { where: {

                customerId: customerId // TODO DEFINIRE ASSOCIATION
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

    return CustomerEntity.destroy ( {

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