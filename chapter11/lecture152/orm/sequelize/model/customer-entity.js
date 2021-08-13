const Sequelize = require ( "sequelize" );

const sequelize = require ( "../sequelize-config.js" );

const CustomerEntity = sequelize.define ( "customer", {

    id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {

        type: Sequelize.STRING,
        allowNull: false,
    },
    surname: {

        type: Sequelize.STRING,
        allowNull: false,
    },
    age: {

        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    indexes: [
        {
            fields: [ "name" ],
            unique: false
        },
        {
            fields: [ "surname" ],
            unique: false
        }
    ]
}  );

module.exports = CustomerEntity;