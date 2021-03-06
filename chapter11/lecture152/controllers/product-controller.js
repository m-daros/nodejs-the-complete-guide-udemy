const path = require ( "path" );

const projectRootFolder = require ( "../util/path.js" );
const { ProductEntity } = require ( "../orm/sequelize/model/sequelize-orm-model.js" );

exports.addProductView = ( request, response, next ) => {

    response.sendFile ( path.join ( projectRootFolder, "views", "add-product.html" ) );
};

exports.addProduct = ( request, response, next ) => {

    console.log ( request.body );

    ProductEntity.create ( { name: request.body [ "name" ] } )
        .then ( result => {

            console.log ( `RESULT: ${result}` ); // TODO TMP
            response.redirect ( "/products-view" );
        } )
        .catch ( error => {

            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( `Unable to save product with name: ${product.name}` );
        } )
};

exports.productsView = ( request, response, next ) => {

    ProductEntity.findAll ()
        .then ( products => {

            response.write ( "<h1>Products<h1>" );
            response.write ( "<ul>" );

            products.forEach ( product => {

                response.write ( `<li>${product.name} <a href="/product-detail-view/${product.id}">Detail</a></li>` );
            } )

            response.write ( "</ul>" );
            response.write ( "<a href='/add-product-view'>Add a product</a>" );
            response.send ();
        } )
        .catch ( error => {

            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( "Unable to show products" );
        } );
};

exports.productDetailView = ( request, response, next ) => {

    const productId = parseInt ( request.params.productId , 10 );

    ProductEntity.findByPk ( productId )
        .then ( product => {

            response.write ( "<h1>Product detail<h1>" );
            response.write ( "<ul>" );
            response.write ( `<li>Id: ${product.id} name: ${product.name}</li>` );
            response.write ( "</ul>" );
            response.write ( "<a href='/products-view'>Show all products</a>" );
            response.send ();
        } )
        .catch ( error => {

            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( `Unable to show product with id ${productId}` );
        } );
};