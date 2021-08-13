const Sequelize = require ( "sequelize" );

const sequelize = require ( "../config/orm-sequelize.js" );

const Product = sequelize.define ( "product", {

    id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {

        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    indexes: [
        {
            fields: [ "name" ],
            unique: false
        }
    ]
} );

module.exports = Product;