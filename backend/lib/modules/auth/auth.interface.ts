import {IUser} from "../user/user.interface";
import {FormatResponse} from "../../common/interfaces";


export interface AuthRequest {
    username: string,
    password: string
}

export interface AuthPayload {
    user?: IUser;
    token? : string;
}

export interface AuthResponses extends FormatResponse {
    payload? : AuthPayload
}
