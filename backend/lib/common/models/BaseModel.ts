import {Model,PrimaryKey, Column, Table, CreatedAt, UpdatedAt, AutoIncrement} from "sequelize-typescript";


@Table
export class BaseModel extends Model<BaseModel> {

    @PrimaryKey
    @AutoIncrement
    id!: Number;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

}
