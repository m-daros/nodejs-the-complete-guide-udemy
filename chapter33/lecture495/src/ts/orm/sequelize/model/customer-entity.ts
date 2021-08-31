import { Table, Column, Model, AutoIncrement, PrimaryKey, AllowNull, Index, HasMany } from "sequelize-typescript"
import OrderEntity from "./order-entity";

@Table
export default class CustomerEntity extends Model<CustomerEntity> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull ( false )
    @Column
    id: number

    @Index
    @Column
    name: string

    @Index
    @Column
    surname: string

    @Column
    age: number

    @HasMany ( () => OrderEntity,{ onUpdate: "CASCADE", onDelete: "CASCADE" } )
    orders: OrderEntity [];
}