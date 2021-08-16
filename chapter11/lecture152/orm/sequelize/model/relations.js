// Defines the relations between the entities

const Sequelize = require ( "sequelize" );

const sequelize = require ( "../sequelize-config.js" );

const CustomerEntity = require ( "./customer-entity.js" );
const ProductEntity = require ( "./product-entity.js" );
const OrderEntity = require ( "./order-entity.js" );
const OrderProductEntity = require ( "./order-product-entity.js" );

// A customer can have 0, 1 or more orders
// (one to many association)
OrderEntity.belongsTo ( CustomerEntity, { contraints: true, onDelete: "CASCADE", onUpdate: "CASCADE" } );
CustomerEntity.hasMany ( OrderEntity );

// An order can have many products
// and a product can belongs to many orders
// (many to many association)
ProductEntity.belongsToMany ( OrderEntity, { through: OrderProductEntity } )
OrderEntity.belongsToMany ( ProductEntity, { through: OrderProductEntity } )