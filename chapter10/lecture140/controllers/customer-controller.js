const customerRepository = require ( "../repositories/customer-repository.js" );
const Customer = require ( "../models/customer.js" );

// Add some customer
customerRepository.deleteCustomers ()
    .then ( () =>  {

        customerRepository.addCustomer ( new Customer ( null, "Mario", "Rossi", 24 ) );
        customerRepository.addCustomer ( new Customer ( null, "Marco", "Bianchi", 32 ) )
    } );

exports.customersView = ( request, response, next ) => {

    customerRepository.getCustomers ()
        .then ( customers => {

            response.write ( "<h1>Customers<h1>" );
            response.write ( "<ul>" );

            customers.forEach ( customer => {

                response.write ( `<li>${customer.name} ${customer.surname}</li>` );
            } )

            response.write ( "</ul>" );
            response.send ();
        } )
        .catch ( error => {

            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( "Unable to show customers" );
        } );
};