const db = require ( "../config/orm-sequelize" );

const Product = require ( "../models/product.js" );

exports.addProduct = ( product ) => {

    console.log ( `Adding product: ${product}` );

    return product.save ()
        .catch ( error => {

            const message = `Unable to add product. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.getProducts = () => {

    return Product.findAll ()
        .then ( products => {

            return Promise.resolve ( products );
        } )
        .catch ( error => {

            const message = `Unable to get products. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.getProduct = ( productId ) => {

    return Product.findByPk ( productId )
        .then ( product => {

            return Promise.resolve ( product );
        } )
        .catch ( error => {

            const message = `Unable to get product with id: ${productId}. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};