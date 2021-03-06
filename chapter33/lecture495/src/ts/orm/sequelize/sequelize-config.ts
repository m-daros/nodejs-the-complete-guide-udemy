import { Sequelize } from "sequelize-typescript"

import CustomerEntity from "./model/customer-entity";
import OrderEntity from "./model/order-entity";
import { OrderProductEntity } from "./model/order-product-entity";
import ProductEntity from "./model/product-entity";
import dbConfig from "../../config/database-config"

export default class OrmManager {

    private ormMapper

    constructor () {

        this.ormMapper = new Sequelize ( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {

            host: dbConfig.HOST,
            dialect: dbConfig.DIALECT,

            pool: {

                min: dbConfig.POOL.MIN,
                max: dbConfig.POOL.MAX,
                acquire: dbConfig.POOL.ACQUIRE,
                idle: dbConfig.POOL.IDLE
            }
        } )

        this.ormMapper.addModels ( [ CustomerEntity, OrderEntity, OrderProductEntity, ProductEntity ] )
    }

    public getOrmMapper (): Sequelize {

        return this.ormMapper
    }
}