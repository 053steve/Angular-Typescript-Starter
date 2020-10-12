import {FormatResponse} from "../../common/interfaces";
import {User} from "./user.model";

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;



export interface IUser extends User {

}

export type ISafeUser = Pick<IUser, "firstname" | "lastname" | "username" | "email" | "user_type" | "createdAt" | "updatedAt">;

export interface UserPayload {
    user?: ISafeUser;
    users?: ISafeUser[];
    userLength?: number;
    token? : string;
}

export type UserCreateReq = Pick<IUser,"firstname" | "lastname" | "username" | "password" | "email" | "user_type">;


// export type UserUpdateReq = Pick<IUser,"firstname" | "lastname" | "username" | "email">;

export type UserUpdateReq = Optional<IUser,"firstname" | "lastname" | "username" | "email">;


export interface UserResponse extends FormatResponse {
    payload? : UserPayload
}





