import { Table, Column, Model, AutoIncrement, PrimaryKey, AllowNull, Index, BelongsTo, BelongsToMany, ForeignKey } from "sequelize-typescript"
import CustomerEntity from "./customer-entity";
import ProductEntity from "./product-entity";
import { OrderProductEntity } from "./order-product-entity";

@Table
export default class OrderEntity extends Model<OrderEntity> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull ( false )
    @Column
    id: number

    @Index
    @Column
    date: Date

    @BelongsTo ( () => CustomerEntity, "customerId" )
    customer: CustomerEntity

    // BRUTTO BRUTTO BRUTTO (SI PUO' EVITARE?)
    @ForeignKey (() => CustomerEntity )
    @Column
    customerId: number

    @BelongsToMany (() => ProductEntity, () => OrderProductEntity )
    products: ProductEntity []
}