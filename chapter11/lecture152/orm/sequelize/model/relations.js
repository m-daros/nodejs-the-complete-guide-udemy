const Sequelize = require ( "sequelize" );

const sequelize = require ( "../sequelize-config.js" );

const CustomerEntity = require ( "./customer-entity" );
const OrderEntity = require ( "./order-entity.js" );

// Set the relations between the entities
OrderEntity.belongsTo ( CustomerEntity, { contraints: true, onDelete: "CASCADE", onUpdate: "CASCADE" } );
CustomerEntity.hasMany ( OrderEntity );