import {NextFunction, Request, Response} from "express";
import {IAuth, IRegister, IResetPassword, IStatus, IUser} from "../services/interface";
import validations from "../validations";
import {AuthRepository} from "../repository/authRepository";
import {Password} from "../helpers/Password";
import jwt, {JwtPayload} from "jsonwebtoken";
import {Errors} from "../../../helpers/errors";
import {response} from "../../../helpers/response";
import {SettingsRepository} from "../../Settings/repository/settingsRepository";
import {ISettingsPayload, PaystackMode} from "../../Settings/repository/interface";

const mockSettings: ISettingsPayload = {
    paystack: {
        test_secret_key:"lkjhgfghjk",
        test_public_key: "sdfghjk",
        production_secret_key: "dsyhuj",
        production_public_key:"ewrtyu",
        mode: PaystackMode.TEST
    },
    maintenance_mode:false,
    sendGrid:"drxcfvi;loiho",
    otpExpiry:15,
    expo_access_token: "satyuio",
    force_account_verification: false
}


export class Auth {

    public static user: IUser;

    public static registerPayload: IRegister;

    public static loginPayload: IAuth;

    public static otp: string;

    public static verifyType: string;

    public static resetPasswordPayload: IResetPassword;

    private static authRepository = new AuthRepository();

    public static async login(req: Request, res: Response, next: NextFunction) {
        try {
            Auth.loginPayload   = validations.loginValidationSchema.parse(req.body);
            Auth.user           = await Auth.authRepository.findUserByEmail(Auth.loginPayload.email);

            if (Auth.user === null) return response(res).error('Invalid email or password', 400);
            next();
        } catch (e) {
            return next(e);
        }
    }

    public static signup(req: Request, res: Response, next: NextFunction) {
        try {
            Auth.registerPayload            = validations.registerValidationSchema.parse(req.body);
            //hash the password before sending to the route
            Auth.registerPayload.password   = Password.hash(Auth.registerPayload.password);
            next();
        }
        catch (e) {
            return next(e);
        }
    }

    public static async authenticate(req: Request, res: Response, next: NextFunction) {
       try{
           const user = await Auth.authRepository.findUserByEmail(req.body.email);

           if (typeof user !== null) {
               Auth.user = user;
               next();
           }
           else {
                return response(res).error('Invalid email or password', 400);
           }
       }
       catch (e) {
          return next(e);
       }
    }

    public static async otpVerification(req: Request, res: Response, next: NextFunction) {
        try{
           const data   = validations.otpVerificationValidationSchema.parse(req.body);
           Auth.user    = await Auth.authRepository.findUserByEmail(data.email);

           if (Auth.user === null) return response(res).error('Invalid email or password', 400);

           Auth.verifyType  = data.type;
           Auth.otp         = data.otp;

           next();
        }
        catch (e) {
            return next(e);
        }
    }

    public static async resetPassword(req: Request, res: Response, next: NextFunction) {
       try{
           Auth.resetPasswordPayload    = validations.resetPasswordValidationSchema.parse(req.body);
           Auth.user                    = await Auth.authRepository.findUserByEmail(Auth.resetPasswordPayload.email);

           if (Auth.user === null) return response(res).error('Invalid email or password', 400);
           next();
       }
       catch (e) {
          return next(e);
       }
    }

    public static async guard(req: Request, res: Response, next: NextFunction) {
        try{
            let token = req.header('Authorization');

            if (token) {
                const accessToken: string = token.split(' ')[1];
                try {
                    const secret    = process.env.ACCESS_TOKEN_SECRET || '';
                    req.user        = <JwtPayload>jwt.verify(accessToken, secret);

                    return Auth.userAuth(req.user.email, false, req, res, next);
                }
                catch (e:any) {
                    return response(res).error(Errors(e), 403);
                }
            }
            else {
                return response(res).error('No Authorization token found', 403);
            }
        }
        catch (e:any) {
            return response(res).error(Errors(e), 403);
        }
    }

    private static async userAuth(email: string, isAdmin: boolean = false, req: Request, res: Response, next: NextFunction) {

        Auth.user = await Auth.authRepository.findUserByEmail(email);

        if (Auth.user === null) return response(res).error('Invalid email or password', 400);

        if (isAdmin) {
            if (Auth.user.role !== 'admin')  response(res).error('You are not authorized to perform this action', 400);
        }

        if (Auth.user.status === IStatus.DISABLED) return response(res).error('Your account has been disabled, please contact support', 403);

        next();
    }

    public static logout(req: Request, res: Response, next: NextFunction) {

    }

    public static async settings(req: Request, res: Response, next: NextFunction) {
        try {
            const settings = await new SettingsRepository().get();
            if (settings){
                next();
            }
            else
            {
                //create a settings record and continue
                await new SettingsRepository().generate(mockSettings);
                next();
            }
        } catch (e) {
            return next(e);
        }
    }

}
