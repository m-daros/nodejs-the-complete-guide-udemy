const CustomerEntity = require ( "../orm/sequelize/model/customer-entity.js" );

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