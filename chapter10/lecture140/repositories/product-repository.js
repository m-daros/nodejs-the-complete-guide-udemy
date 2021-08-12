const db = require ( "../util/database" );

const Product = require ( "../models/product.js" );

exports.addProduct = ( product ) => {

    return db.execute ( "INSERT INTO PRODUCTS ( name ) VALUES ( ? )", [ product.name ] )
        .catch ( error => {

            const message = `Unable to add product. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.getProducts = () => {

    return db.execute ( "SELECT id, name FROM PRODUCTS" )
        .then ( results => {

            const products = [];

            results [0].forEach ( record => {

                products.push ( new Product ( record.id, record.name ) );
            } )

            return Promise.resolve ( products );
        } )
        .catch ( error => {

            const message = `Unable to get products. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.getProduct = ( productId ) => {

    return db.execute ( `SELECT id, name FROM PRODUCTS WHERE id = ${productId}` )
        .then ( results => {

            const record = results [0] [0]; // TODO DA MIGLIORARE

            return Promise.resolve ( new Product ( record.id, record.name ) );
        } )
        .catch ( error => {

            const message = `Unable to get product with id: ${productId}. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};