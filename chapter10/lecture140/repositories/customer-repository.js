const db = require ( "../util/database" );

const Customer = require ( "../models/customer.js" );

exports.addCustomer = ( customer ) => {

    return db.execute ( "INSERT INTO CUSTOMERS ( name, surname, age ) VALUES ( ?, ?, ? )", [ customer.name, customer.surname, customer.age ] )
        .catch ( error => {

            const message = `Unable to add customer. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.getCustomers = () => {

    return db.execute ( "SELECT id, name, surname, age FROM CUSTOMERS" )
        .then ( results => {

            const customers = [];

            results [0].forEach ( record => {

                customers.push ( new Customer ( record.id, record.name, record.surname, record.age ) );
            } )

            return Promise.resolve ( customers );
        } )
        .catch ( error => {

            const message = `Unable to get customers. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.deleteCustomers = () => {

    return db.execute ( "DELETE FROM CUSTOMERS" )
        .then ( () => {

            Promise.resolve ()
        } )
        .catch ( error => {

            const message = `Unable to delete customers. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } )
};