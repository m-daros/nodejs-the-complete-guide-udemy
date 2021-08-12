const db = require ( "../util/database" );

const Product = require ( "../models/product.js" );

exports.addProduct = ( product ) => {

    return db.execute ( "INSERT INTO PRODUCTS ( name ) VALUES ( ? )", [ product.name ] )
};

exports.getProducts = async () => {

    return db.execute ( "SELECT id, name FROM PRODUCTS" )
        .then ( results => {

            const products = [];

            results [0].forEach ( record => {

                products.push ( new Product ( record.id, record.name ) );
            } )

            return Promise.resolve ( products );    // TODO PROVARE SENZSA Promise.resolve
        } )
        .catch ( error => {

            console.log ( `Unable to get products. Error: ${error}` )
            return Promise.reject ( [] );     // TODO PROVARE SENZSA Promise.reject
        } );
};

exports.getProduct = async ( productId ) => {

    return db.execute ( `SELECT id, name FROM PRODUCTS WHERE id = ${productId}` )
        .then ( results => {

            const record = results [0] [0]; // TODO DA MIGLIORARE

            return Promise.resolve ( new Product ( record.id, record.name ) ); // TODO PROVARE SENZSA Promise.resolve
        } )
        .catch ( error => {

            console.log ( `Unable to get product with id: ${productId}. Error: ${error}` )
            return Promise.reject ( null );     // TODO PROVARE SENZSA Promise.reject
        } );
};