const express = require ( "express" );
const path = require ( "path" )

const projectRootFolder = require ( "../util/path.js" )

const router = express.Router ();

var products = [];

router.get ( "/add-product-view", ( request, response, next ) => {

    response.sendFile ( path.join ( projectRootFolder, "views", "add-product.html" ) );
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