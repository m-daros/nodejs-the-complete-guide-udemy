const Sequelize = require ( "sequelize" );

const sequelize = require ( "../sequelize-config.js" );

const OrderEntity = sequelize.define ( "order", {

    id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {

        type: Sequelize.DATE,
        allowNull: false,
    }
}, {
    indexes: [
        {
            fields: [ "date" ],
            unique: false
        }
    ]
} );

module.exports = OrderEntity;