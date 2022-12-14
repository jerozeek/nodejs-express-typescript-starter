import { Response } from 'express';
import {IStatus, IUser} from "../services/interface";
import {authFactory} from "../factory/authFactory";
import {response} from "../../../helpers/response";
import {Otp} from "../helpers/otp";
import {Cookies} from "../../../helpers/cookies";
import {UserResource} from "./index";
import {ResponseFactoryType} from "../../Settings/repository/interface";
import {SettingsRepository} from "../../Settings/repository/settingsRepository";

const serviceInstance = authFactory();

export class ResponseFactory {

    private readonly res: Response;
    private readonly user: IUser

    constructor(res: Response, user: IUser) {
        this.res = res;
        this.user = user;
    }

    public send(type: string) {
        switch (this.user.status)
        {
            case IStatus.PENDING :
                return this.pending(type)

            case IStatus.ACTIVE :
                return this.active(type)

            case IStatus.DISABLED :
                return this.disabled()
        }
    }

    public async twoFactor() {
        await Otp.twoFactor(this.user.email);
        return response(this.res).success(200, 'An OTP have been sent to your email.', {email: this.user.email})
    }

    private async pending(type: string) {

        //redirect to sign in without generating token. for mobile app.
        if (type === ResponseFactoryType.middleware) return this.signIn();

        //check if verification is enforced!!!!!
        const settings = await new SettingsRepository().get();
        if (!settings.force_account_verification) return this.active(type);

        await Otp.accountActivation(this.user.email);
        return response(this.res).success(200, 'An OTP have been sent to your email.', {email: this.user.email})
    }

    private async disabled() {
        return response(this.res).error('Account have been disabled. Please contact support');
    }

    private async active(type: string) {

        //redirect to sign in without generating token. for mobile app.
        if (type === ResponseFactoryType.middleware) return this.signIn();

        // for two-factor authentication
        if (type !== ResponseFactoryType.verification) {
            if (this.user.settings.allowTwoFactor) return this.twoFactor();
        }

        //generate and update tokens.
        const accessToken  = await serviceInstance.createAccessToken(this.user);
        const refreshToken = await serviceInstance.createRefreshToken(this.user);

        if (this.user.deviceId === 'web') Cookies.set(this.res, refreshToken);

        return response(this.res).success(200, type === ResponseFactoryType.login || type === ResponseFactoryType.verification ? 'Login was successful' : 'Account created successfully', {
            user: new UserResource(this.user).get(),
            accessToken,
            refreshToken: this.user.deviceId === 'web' ? null : refreshToken
        })
    }

    private async signIn() {
        return response(this.res).success(200, 'Login was successful', {
            user: new UserResource(this.user).get(),
        });
    }

}
