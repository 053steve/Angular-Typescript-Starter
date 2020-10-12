import * as express from "express";
import * as jwt from "jsonwebtoken";
import {getToken} from "../common/utils/auth";
import config from "../../config";
import {ApiError} from "../common/utils/apiError";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {


    if (securityName === "jwt") {
        return new Promise((resolve, reject) => {
            const token = getToken(request);
            if(!token) {
                reject(new ApiError(false,"NoAuthorization",422,"No Authorization"));
            }

            let decoded = null;
            try {
                decoded = jwt.verify(token, config.token);
                resolve(decoded);
            } catch (error) {
                reject(error);
            }
        });
    }
}
