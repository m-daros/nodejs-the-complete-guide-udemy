const products = [];

exports.addProduct = ( product ) => {

    products.push ( product );
};

exports.getProducts = () => {

    return products;
};