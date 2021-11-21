import {
    Body,
    Post,
    Route,
    Request,
    Tags,
} from "tsoa";

import { AuthService } from './auth.service';

import { AuthRequest, AuthResponses, AuthType } from "./auth.interface";
import { ApiError } from "../../common/utils/apiError";
import { validateAuthReq } from '../../common/utils/auth';


@Route("auth")
export class AuthController {
    @Post()
    @Tags('auth')
    public async auth(@Body() requestBody: AuthRequest, @Request() req: any): Promise<AuthResponses> {
        try {
            // const result = await new AuthService().authenticate(req);
            const authType = requestBody.authType;
            let result;

            const validationResults = validateAuthReq(requestBody);
            
            if (!validationResults.ok) {
                throw new ApiError(false, "Login Error", 422, validationResults.errors.join('|'));
            }

            switch (authType) {
                case AuthType.STANDARD:

                    result = await new AuthService().authenticate(req);
                    break;

                case AuthType.W3_WALLET:

                    result = await new AuthService().authenticateWeb3(req);
                    break;

                default:
                    throw new ApiError(false, "Login Error", 500, 'no auth type set');
            }

            const auth: AuthResponses = {
                success: true,
                payload: {
                    user: result.user,
                    token: result.token
                }
            }
            return auth;
        } catch (err) {
            throw new ApiError(false, "Login Error", err.code, err.message);
        }

    }

}
