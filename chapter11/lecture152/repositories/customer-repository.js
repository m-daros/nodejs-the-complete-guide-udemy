const db = require ( "../orm/sequelize/sequelize-config" );

const Customer = require ( "../orm/sequelize/model/customer.js" );

exports.addCustomer = ( customer ) => {

        return customer.save ()
        .catch ( error => {

            const message = `Unable to add customer. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.getCustomers = () => {

    return Customer.findAll ()
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

    return Customer.destroy ( {

            where: {},
            truncate: true
        } )
        .then ( () => {

            Promise.resolve ()
        } )
        .catch ( error => {

            const message = `Unable to delete customers. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } )
};