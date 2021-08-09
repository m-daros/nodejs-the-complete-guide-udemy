const path = require ( "path" );

const projectRootFolder = require ( "../util/path.js" );
const productRepository = require ( "../repositories/product-repository.js" );
const Product = require ( "../models/product.js" );

exports.addProductView = ( request, response, next ) => {

    response.sendFile ( path.join ( projectRootFolder, "views", "add-product.html" ) );
};

exports.addProduct = ( request, response, next ) => {

    console.log ( request.body );

    const product = new Product ( request.body [ "name" ] );
    productRepository.addProduct ( product )

    response.redirect ( "/products-view" );
};

exports.productsView = ( request, response, next ) => {

    response.write ( "<h1>Products<h1>" );
    response.write ( "<ul>" );

    const products = productRepository.getProducts ();

    products.forEach ( product => {

        response.write ( `<li>${product.name}</li>` );
    } )

    response.write ( "</ul>" );
    response.write ( "<a href='/add-product-view'>Add a product</a>" );
    response.send ();
};