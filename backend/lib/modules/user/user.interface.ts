import {FormatResponse} from "../../common/interfaces";
import {ALL_USER_TYPE, USER_TYPE, USER_TYPE_ENUM} from "../../constants";
import {Base} from "../../common/interfaces/base";
import {Model} from "sequelize";

export interface UserModel extends Model {
    validatePassword?: (password: string) => Promise<boolean>;
    generateToken?: () => string;
}


export interface IUser extends Base, UserModel {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    employee_no?: string;
    user_type: USER_TYPE
    email: string;
}


export type ISafeUser = Pick<IUser, "firstname" | "lastname" | "username" | "email" | "user_type" | "createdAt" | "updatedAt">;

export interface UserPayload {
    user?: ISafeUser;
    users?: ISafeUser[];
    userLength?: number;
    token? : string;
}

export type UserCreateReq = Pick<IUser,"firstname" | "lastname" | "username" | "password" | "email" | "user_type">;


type UserUpdateReqPick = Pick<IUser,"firstname" | "lastname" | "username" | "email">;


export type UserUpdateReq = Omit<UserUpdateReqPick,"firstname" | "lastname" | "username" | "email"> & {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
}


export interface UserResponse extends FormatResponse {
    payload? : UserPayload
}






