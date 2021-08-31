import { Table, Column, Model, AutoIncrement, PrimaryKey, AllowNull, ForeignKey } from "sequelize-typescript"
import ProductEntity from "./product-entity";
import OrderEntity from "./order-entity";

@Table
export class OrderProductEntity extends Model<OrderProductEntity> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull ( false )
    @Column
    id: number

    @Column
    quantity: number

    @ForeignKey (() => OrderEntity )
    @Column
    orderId: number

    @ForeignKey (() => ProductEntity )
    @Column
    productId: number
}