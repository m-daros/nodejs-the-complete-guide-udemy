const express = require ( "express" );

var customers = [];
customers.push ( { name: "Mario", surname: "Rossi" } );
customers.push ( { name: "Marco", surname: "Bianchi" } );

exports.customersView = ( request, response, next ) => {

    response.write ( "<h1>Customers<h1>" );
    response.write ( "<ul>" );

    customers.forEach ( customer => {

        response.write ( `<li>${customer.name} ${customer.surname}</li>` );
    } )

    response.write ( "</ul>" );
    response.send ();
};