const Sequelize = require ( "sequelize" );

const dbConfig = require ( "../../config/database-config.js" );

const sequelize = new Sequelize ( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {

    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,

    pool: {

        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

module.exports = sequelize;