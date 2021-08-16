// TODO Forse lo strato di repository è inutile, farebbe da passacarte al model definito da sequelize --> Il model sequelize potrebbe essere visto come repository
const CustomerEntity = require ( "../orm/sequelize/model/customer-entity.js" );

const relations = require ( "../orm/sequelize/model/relations.js" );

exports.addCustomer = ( customer ) => {

        return customer.save ()
        .catch ( error => {

            const message = `Unable to add customer. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.getCustomers = () => {

    return CustomerEntity.findAll ()
        .then ( customers => {

            return Promise.resolve ( customers );
        } )
        .catch ( error => {

            const message = `Unable to get customers. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.deleteCustomers = () => {

    return CustomerEntity.destroy ( {

            where: {},
            truncate: false
        } )
        .then ( () => {

            Promise.resolve ()
        } )
        .catch ( error => {

            const message = `Unable to delete customers. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};