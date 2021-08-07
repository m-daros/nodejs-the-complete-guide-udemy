const express = require ( "express" );

const router = express.Router ();

var customers = [];
customers.push ( { name: "Mario", surname: "Rossi" } );
customers.push ( { name: "Marco", surname: "Bianchi" } );

router.get ( "/customers-view", ( request, response, next ) => {

    response.write ( "<h1>Customers<h1>" );
    response.write ( "<ul>" );

    customers.forEach ( customer => {

        response.write ( `<li>${customer.name} ${customer.surname}</li>` );
    } )

    response.write ( "</ul>" );
    response.send ();
} )

module.exports = router;