const db = require ( "../util/database" );

const Customer = require ( "../models/customer.js" );

exports.addCustomer = ( customer ) => {

    return db.execute ( "INSERT INTO CUSTOMERS ( name, surname, age ) VALUES ( ?, ?, ? )", [ customer.name, customer.surname, customer.age ] )
};

exports.getCustomers = () => {

    return db.execute ( "SELECT id, name, surname, age FROM CUSTOMERS" )
        .then ( results => {

            const customers = [];

            results [0].forEach ( record => {

                customers.push ( new Customer ( record.id, record.name, record.surname, record.age ) );
            } )

            return Promise.resolve ( customers );    // TODO PROVARE SENZSA Promise.resolve
        } )
        .catch ( error => {

            console.log ( `Unable to get customers. Error: ${error}` )
            return Promise.reject ( [] );     // TODO PROVARE SENZSA Promise.reject
        } );
};