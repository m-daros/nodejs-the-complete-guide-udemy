import {Table, Column, Model, AutoIncrement, PrimaryKey, AllowNull, Index, BelongsToMany} from "sequelize-typescript"
import {OrderProductEntity} from "./order-product-entity";
import {OrderEntity} from "./order-entity";

@Table
export class ProductEntity extends Model<ProductEntity> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull ( false )
    @Column
    id: number

    @Index
    @Column
    name: string

    // TODO Questo non è utilissimo, si potrebbe provare ad omettere
    @BelongsToMany (() => OrderEntity, () => OrderProductEntity )
    orders: OrderEntity []
}