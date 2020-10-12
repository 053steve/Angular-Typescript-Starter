import {
    Body,
    Post,
    Route,
    Request,
    Tags,
} from "tsoa";

import { AuthService } from './auth.service';

import {AuthRequest, AuthResponses} from "./auth.interface";
import {ApiError} from "../../common/utils/apiError";
import {UserResponse} from "../user/user.interface";


@Route("auth")
export class AuthController {
    @Post()
    @Tags('auth')
    public async auth(@Body() requestBody: AuthRequest, @Request() req: any): Promise<AuthResponses> {
        try {
            const result = await new AuthService().authenticate(req);
            const auth: AuthResponses = {
                success: true,
                payload: {
                    user: result.user,
                    token: result.token
                }
            }
            return auth;
        } catch (err) {
            throw new ApiError(false,"Login Error",422, "cannot find user");
        }

    }

}
