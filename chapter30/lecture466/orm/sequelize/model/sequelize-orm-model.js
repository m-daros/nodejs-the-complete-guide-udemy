const Sequelize = require ( "sequelize" )

const sequelize = require ( "../sequelize-config" )

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
} )

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
} )

const ProductEntity = sequelize.define ( "product", {

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
} )

const OrderProductEntity = sequelize.define ( "order_product", {

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
} )

// A customer can have 0, 1 or more orders
// (one to many association)
OrderEntity.belongsTo ( CustomerEntity, { contraints: true, onDelete: "CASCADE", onUpdate: "CASCADE" } )
CustomerEntity.hasMany ( OrderEntity )

// An order can have many products
// and a product can belongs to many orders
// (many to many association)
ProductEntity.belongsToMany ( OrderEntity, { through: OrderProductEntity } )
OrderEntity.belongsToMany ( ProductEntity, { through: OrderProductEntity } )

module.exports = {

    CustomerEntity: CustomerEntity,
    OrderEntity: OrderEntity,
    ProductEntity: ProductEntity,
    OrderProductEntity: OrderProductEntity
}