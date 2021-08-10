var productId = 0;

exports.generateId = () => {

    productId++;

    return productId;
};