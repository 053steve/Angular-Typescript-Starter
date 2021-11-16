import {INTEGER, STRING, ENUM} from "sequelize";
// import {sequalize} from "../../db";
import {ALL_USER_TYPE, USER_TYPE, USER_TYPE_ENUM} from "../../constants";
import bcrypt from 'bcryptjs';
import config from '../../../config';
import jwt from 'jsonwebtoken';


export default (sequelize, DataTypes) =>   {
    const User = sequelize.define('User', {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        firstname: {
            type: STRING,
        },

        lastname: {
            type: STRING,
        },

        username: {
            type: STRING,
            unique: true,
            allowNull: false
        },

        password: {
            type: STRING,
            allowNull: false
        },

        user_type: {
            type: ENUM(...Object.keys(USER_TYPE_ENUM)),
            defaultValue: USER_TYPE_ENUM.STAFF
        },

        email: {
            type: STRING,
            unique: true
        }
    },{
        timestamp: true
    });



    User.beforeCreate( async (user, options) => {
        if (!user.username) {    // If dont have username get username from email
            const splitEmail = user.email.split('@');
            const userName = splitEmail[0];
            user.username = userName;
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    });


    User.prototype.validatePassword = async function (password) {
        const isMatch = bcrypt.compare(password, this.password);
        return isMatch;
    }

    User.prototype.generateToken = () => {
        const user: any = this;
        return jwt.sign({ id: user.id }, config.token, { expiresIn: '1h' });
    }


    return User;
};

