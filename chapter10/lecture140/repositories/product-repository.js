const db = require ( "../util/database" );

const products = [];

exports.addProduct = ( product ) => {

    products.push ( product );
};

exports.getProducts = () => {

    // TODO ...
    db.execute ( "SELECT * FROM PRODUCTS" );

    return products;
};