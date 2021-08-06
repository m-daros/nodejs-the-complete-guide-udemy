const express = require ( "express" );

const router = express.Router ();

var products = [];

router.get ( "/add-product-view", ( request, response, next ) => {

    response.send ( "<h1>Add product<h1><form method='POST' action='/add-product'><input type='text' name='name'/><button type='submit'>Add</button></form>" );
} )

router.post ( "/add-product", ( request, response, next ) => {

    console.log ( request.body );

    products.push ( request.body [ "name" ] );
    response.redirect ( "/products-view" );
} )

router.get ( "/products-view", ( request, response, next ) => {

    response.write ( "<h1>Products<h1>" );
    response.write ( "<ul>" );

    products.forEach ( product => {

        response.write ( `<li>${product}</li>` );
    } )

    response.write ( "</ul>" );
    response.write ( "<a href='/add-product-view'>Add a product</a>" );
    response.send ();
} )

module.exports = router;