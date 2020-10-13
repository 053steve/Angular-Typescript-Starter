import { NextFunction, Request, Response } from 'express';
import {User} from '../user/user.model';
import { IVerifyOptions } from 'passport-local';
import passport from 'passport';
import {ApiError} from "../../common/utils/apiError";
import {IUser} from "../user/user.interface";


export class AuthService {

    // public async resetPassword(req: Request, res: Response, next: NextFunction) {
    //     const rePassForm = req.body.passForm;
    //
    //
    //     try {
    //
    //         let user: IUser = await User.findById(rePassForm.userId).populate('avatar').exec();
    //         if (!user) {
    //             return res.status(422).send({ result: { isSuccess: false, data: null, msg: "cannont find user" } });
    //
    //         }
    //
    //         const isMatch = await user.validatePassword(rePassForm.oldPass);
    //
    //         if (!isMatch) {
    //             return res.status(422).send({ result: { isSuccess: false, data: null, msg: "Incorrect Password" } });
    //         }
    //
    //         user.password = rePassForm.newPass;
    //
    //         await user.save();
    //
    //         const token = user.generateToken();
    //         const response = user.toJSON();
    //
    //         delete response.password;
    //         const data = {
    //             token,
    //             user: response
    //         }
    //         console.log(user);
    //         res.send({ result: { isSuccess: true, data: data, msg: '' } });
    //
    //     } catch (err) {
    //         return res.status(422).send({ result: { isSuccess: false, data: null, msg: err } });
    //     }
    //
    // }

    public async authenticate(req: any): Promise<any> {
        // this is external promise needed for passport
        return new Promise((resolve, reject)=> {

            passport.authenticate('local', (err: Error, user: User, info: IVerifyOptions) => {
                if (!user) {
                    return reject();
                }

                const token = user.generateToken();
                const response: any = user.toJSON();

                delete response.password;

                const data = {
                    token,
                    user: response
                }

                resolve(data);


            })(req);
        })

    }
}
