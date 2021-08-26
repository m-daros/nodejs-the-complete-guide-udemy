const { ProductEntity } = require ( "../orm/sequelize/model/sequelize-orm-model.js" );

exports.addProduct = ( request, response, next ) => {

    console.log ( request.body );

    ProductEntity.create ( { name: request.body [ "name" ] } )
        .then ( product => {

            response.status ( 200 )
                .json ( product );
        } )
        .catch ( error => {

            // TODO DATA MODEL COMUNE DEGLI ERRORI
            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( `Unable to save product with name: ${product.name}` );
        } )
};

exports.getProducts = ( request, response, next ) => {

    ProductEntity.findAll ()
        .then ( products => {

            response.status ( 200 )
                .json ( products );
        } )
        .catch ( error => {

            // TODO DATA MODEL COMUNE PER GLI ERRORI
            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( "Unable to show products" );
        } );
};

exports.getProduct = ( request, response, next ) => {

    const productId = parseInt ( request.params.productId , 10 );

    ProductEntity.findByPk ( productId )
        .then ( product => {

            if ( ! product ) {

                console.error ( `Unable to find product with id ${productId}` );

                // TODO USARE DATA MODEL DEGLI ERRORI
                response.status ( 404 )
                    .json ( { message: `Unable to find product with id ${productId}` } )
            }
            else {

                response.status ( 200 )
                    .json ( product );
            }
        } )
        .catch ( error => {

            // TODO DATA MODEL COMUNE PER GLI ERRORI
            console.error ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( `Unable to show product with id ${productId}` );
        } );
};