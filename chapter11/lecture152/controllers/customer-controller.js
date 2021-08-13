const customerRepository = require ( "../repositories/customer-repository.js" );

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