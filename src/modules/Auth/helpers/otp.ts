import {expiryTimeInMinutes, generateRandomNumber, now} from "./index";
import {AuthRepository} from "../repository/authRepository";
import {Auth} from "../middleware/authentication";
import {IAuthRepository} from "../repository/interface";
import {emailSubscriber} from "../../../events/observers/subscribers/emailSubscribers";

export enum OtyTypes {
    PASSWORD_RESET = "password_reset",
    ACCOUNT_VERIFICATION = "account_verification",
}

export class Otp {

    static AuthRepository: IAuthRepository = new AuthRepository();

    private static otp: string;

    private static expiry: number;

    public static verifyType: OtyTypes;

    public static async set(type: number, email: string, passwordReset: boolean = false) {
        switch (type) {
            case 1:
                return Otp.accountActivation(email)
            case 2 :
                return Otp.passwordReset(email)
            case 3 :
                return Otp.resetOtp(email, passwordReset)
            case 4 :
                return Otp.twoFactor(email)
        }
    }

    public static async resetOtp(email: string, passwordReset: boolean = false) {
        Otp.create();
        Otp.createExpiryTime()
        return Otp.AuthRepository.updateUserFields(email, {
            otp: Otp.otp,
            passwordReset,
            otpExpiry: Otp.expiry
        });
    }

    public static async accountActivation(email: string):Promise<boolean> {
        await Otp.resetOtp(email);
        //send in an email
        await emailSubscriber(email, 'Account Activation','activation', {otp: Otp.otp})
        return true;
    }

    public static async twoFactor(email: string):Promise<boolean> {
        await Otp.resetOtp(email);
        //send in an email
        //emailSubscriber(email, 'Two Factor','two_factor', {otp: Otp.otp})
        return true;
    }

    public static async passwordReset(email: string): Promise<boolean> {
        await Otp.resetOtp(email, true);
        //send in an email
        await emailSubscriber(email, 'Password Reset', 'password_reset', {otp: Otp.otp})
        return true;
    }

    private static create (): void {
        Otp.otp = generateRandomNumber(4);
    }

    private static createExpiryTime (timeInMinute: number = 30):void {
        Otp.expiry = expiryTimeInMinutes(timeInMinute);
    }

    public static compare(): boolean {
        if (now > Number(Auth.user.otpExpiry)) return false;
        return Auth.user.otp === Auth.otp;
    }
}
