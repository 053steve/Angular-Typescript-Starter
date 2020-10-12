import {User} from "../user/user.model";
import {FormatResponse} from "../../common/interfaces";


export interface AuthRequest {
    username: string,
    password: string
}

export interface AuthPayload {
    user?: User;
    token? : string;
}

export interface AuthResponses extends FormatResponse {
    payload? : AuthPayload
}
