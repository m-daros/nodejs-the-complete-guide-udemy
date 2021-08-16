// TODO Forse lo strato di repository è inutile, farebbe da passacarte al model definito da sequelize --> Il model sequelize potrebbe essere visto come repository
const { ProductEntity } = require ( "../orm/sequelize/model/sequelize-orm-model.js" );

//const relations = require ( "../orm/sequelize/model/relations.js" );

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

    return ProductEntity.findAll ()
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

    return ProductEntity.findByPk ( productId )
        .then ( product => {

            return Promise.resolve ( product );
        } )
        .catch ( error => {

            const message = `Unable to get product with id: ${productId}. Error: ${error}`;
            console.log ( message )
            return Promise.reject ( message );
        } );
};

exports.deleteProducts = () => {

    return ProductEntity.destroy ( {

        where: {},
        truncate: false
    } )
    .then ( () => {

        Promise.resolve ()
    } )
    .catch ( error => {

        const message = `Unable to delete products. Error: ${error}`;
        console.log ( message )
        return Promise.reject ( message );
    } );
};