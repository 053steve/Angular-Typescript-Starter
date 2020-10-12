import { Request, Response, NextFunction } from "express";
import { getToken } from '../common/utils/auth';
import { verify } from 'jsonwebtoken';
import config from '../../config'

export async function ensureJWT (req: Request, res: Response, next: NextFunction) {
    const token = getToken(req);
    if(!token) {
        return res.status(401).send('No Authorization');
        
    }

    let decoded = null;
    try {
        decoded = verify(token, config.token);
        res.locals.token = token;
    } catch (error) {
        return res.status(401).send('No Authorization');
        
    }

    return next();
}
