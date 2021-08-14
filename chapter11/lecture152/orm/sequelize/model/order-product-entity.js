const Sequelize = require ( "sequelize" );

const sequelize = require ( "../sequelize-config.js" );

const OrderProductEntity = sequelize.define ( "order-product", {

    id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {

        type: Sequelize.INTEGER,
        allowNull: false,
    }
} );

module.exports = OrderProductEntity;