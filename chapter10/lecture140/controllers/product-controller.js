const path = require ( "path" );

const projectRootFolder = require ( "../util/path.js" );
const productRepository = require ( "../repositories/product-repository.js" );
const idGenerator = require ( "../util/id-generator.js" );

const Product = require ( "../models/product.js" );

exports.addProductView = ( request, response, next ) => {

    response.sendFile ( path.join ( projectRootFolder, "views", "add-product.html" ) );
};

exports.addProduct = ( request, response, next ) => {

    console.log ( request.body );

    const product = new Product ( idGenerator.generateId (), request.body [ "name" ] );
    productRepository.addProduct ( product )

    response.redirect ( "/products-view" );
};

exports.productsView = ( request, response, next ) => {

    response.write ( "<h1>Products<h1>" );
    response.write ( "<ul>" );

    const products = productRepository.getProducts ();

    products.forEach ( product => {

        response.write ( `<li>${product.name} <a href="/product-detail-view/${product.id}">Detail</a></li>` );
    } )

    response.write ( "</ul>" );
    response.write ( "<a href='/add-product-view'>Add a product</a>" );
    response.send ();
};

exports.productDetailView = ( request, response, next ) => {

    const productId = parseInt ( request.params.productId , 10 );
    const products = productRepository.getProducts ();
    const product = products.find ( product => product.id === productId ) // TODO SEMBRA NON TROVARE NULLA

    response.write ( "<h1>Product detail<h1>" );
    response.write ( "<ul>" );
    response.write ( `<li>Id: ${product.id} name: ${product.name}</li>` );
    response.write ( "</ul>" );
    response.write ( "<a href='/products-view'>Show all products</a>" );
    response.send ();
};