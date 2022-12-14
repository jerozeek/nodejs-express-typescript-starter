import { Request, Response } from "express";
import {authFactory} from "../factory/authFactory";
import {Auth} from "../middleware/authentication";
import {response} from "../../../helpers/response";
import {Password} from "../helpers/Password";
import {ResponseFactory} from "../resource/responseFactory";
import {ResponseFactoryType} from "../../Settings/repository/interface";
import {Errors} from "../../../helpers/errors";

export class AuthRoute {

    private static authService = authFactory();

    public static login(req: Request, res: Response) {
        const verifyPassword = Password.verify(Auth.user.password, Auth.loginPayload.password);
        if (!verifyPassword) return response(res).error("Invalid password");

        AuthRoute.authService.login(Auth.loginPayload).then((user) => {
            return new ResponseFactory(res, user).send(ResponseFactoryType.login);
        }).
        catch((e) => {
            return response(res).error(Errors(e));
        })
    }

    public static register(req: Request, res: Response) {
        AuthRoute.authService.register(Auth.registerPayload).then((user) => {
            return new ResponseFactory(res, user).send(ResponseFactoryType.signup)
        }).
        catch((e) => {
            return response(res).error(Errors(e));
        })
    }

    public static forgetPassword(req: Request, res: Response) {
        AuthRoute.authService.forgotPassword(Auth.user.email).then((user) => {
            return response(res).success(200, 'An OTP have been sent to your email', {email: user.email})
        }).
        catch((e) => {
            return response(res).error(Errors(e));
        })
    }
    //for mobile app
    public static me(req: Request, res: Response) {
        AuthRoute.authService.middleware(Auth.user.email).then((result) => {
            return new ResponseFactory(res, result).send(ResponseFactoryType.middleware);
        }).
        catch((e:any) => {
            return response(res).error(Errors(e));
        })
    }

    public static verifyOtp(req: Request, res: Response) {
        AuthRoute.authService.verifyOtp(Auth.user.email).then((result) => {
            if (typeof result === "boolean")
            return response(res).success(
                200,
                'Verification was successful',
                {
                    email: Auth.user.email
                })
            //log the user in if its account verification request
            return new ResponseFactory(res, result).send(ResponseFactoryType.verification);
        }).
        catch((e:any) => {
            return response(res).error(Errors(e));
        })
    }

    public static resetPassword(req: Request, res: Response) {
        AuthRoute.authService.resetPassword({
            email: Auth.user.email,
            password: Auth.resetPasswordPayload.password,
            confirmPassword: Auth.resetPasswordPayload.confirmPassword
        }).then((result) => {

        }).
        catch((e:any) => {
            return response(res).error(Errors(e));
        })
    }

    public static logout(req: Request, res: Response) {

    }

    public static userSettings(req: Request, res: Response) {

    }

}
