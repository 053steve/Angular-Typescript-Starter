import {Model, Column, Table, Unique, DataType, Default, BeforeCreate} from "sequelize-typescript";
import {BaseModel} from '../../common/models/BaseModel';
import {ALL_USER_TYPE, USER_TYPE, USER_TYPE_ENUM} from "../../constants";
import bcrypt from 'bcryptjs';
import config from '../../../config';
import jwt from 'jsonwebtoken';
import {IUser} from "./user.interface";

@Table
export class User extends Model<BaseModel> {

    @Column
    firstname: string;

    @Column
    lastname: string;

    @Unique
    @Column
    username: string;

    @Column
    password: string;

    @Column
    employee_no?: string;

    @Default(USER_TYPE_ENUM.STAFF)
    @Column(DataType.ENUM(...ALL_USER_TYPE))
    user_type: USER_TYPE;

    @Unique
    @Column
    email: string;

    @BeforeCreate
    static checkUsername(user: User) {
        if (!user.username) {    // If dont have username get username from email
            const splitEmail = user.email.split('@');
            const userName = splitEmail[0];
            user.username = userName;
        }
    }


    @BeforeCreate
    static async preSave(user: IUser) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }

    async validatePassword(password) {
        const user: IUser = this;
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch;

    }

    generateToken() {
        const user: IUser = this;
        return jwt.sign({ id: user.id }, config.token, { expiresIn: '1h' });
    }

}


