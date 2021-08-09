const customerRepository = require ( "../repositories/customer-repository.js" );
const Customer = require ( "../models/customer.js" );

// Add some customer
customerRepository.addCustomer ( new Customer ( "Mario", "Rossi", 24 ) );
customerRepository.addCustomer ( new Customer ( "Marco", "Bianchi", 32 ) );

exports.customersView = ( request, response, next ) => {

    response.write ( "<h1>Customers<h1>" );
    response.write ( "<ul>" );

    const customers = customerRepository.getCustomers ();

    customers.forEach ( customer => {

        response.write ( `<li>${customer.name} ${customer.surname}</li>` );
    } )

    response.write ( "</ul>" );
    response.send ();
};