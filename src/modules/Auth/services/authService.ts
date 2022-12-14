import {AuthServiceInterface, IAuth, IRegister, IResetPassword, IStatus, IUser} from "./interface";
import {IAuthRepository} from "../repository/interface";
import {Otp, OtyTypes} from "../helpers/otp";
import {Password} from "../helpers/Password";
import jwt, {JwtPayload} from "jsonwebtoken";
import {Response} from "express";
import {Cookies} from "../../../helpers/cookies";

export class AuthService implements AuthServiceInterface {

    constructor(private authRepository: IAuthRepository) {}

    public login(payload: IAuth): Promise<IUser> {
        return new Promise(async (resolve) => {
            const loginUser = await this.authRepository.createLogin(
                payload.email,
                payload.deviceId,
                payload.deviceType
            );
            resolve(loginUser);
        });
    }

    public register(payload: IRegister): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const created = await this.authRepository.createUser(payload);
                return resolve(created);
            }
            catch (e) {
                return reject(e);
            }
        });
    }

    public async createAccessToken(user:IUser):Promise<string> {
        return Promise.resolve(await this.authRepository.generateAccessToken(user));
    }

    public async createRefreshToken(user:IUser):Promise<string> {
        return Promise.resolve(await this.authRepository.generateRefreshToken(user));
    }

    public async verifyOtp(email: string): Promise<IUser | boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!Otp.compare()) return reject(false);
                await Otp.resetOtp(email, true);
                //set status of account to active after confirmation
                if (Otp.verifyType !== OtyTypes.ACCOUNT_VERIFICATION) {
                    const userProp = await this.authRepository.updateUserFields(email, {status: 'active'})
                    return resolve(userProp);
                }
                return resolve(true)
            }
            catch (e) {
                return reject(e);
            }
        })
    }

    public forgotPassword(email: string): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
           try
           {
               const user = await this.authRepository.findUserByEmail(email);
               //send otp to user email
               await Otp.passwordReset(email);
               return resolve(user);
           }
           catch (e) {
               return reject(e);
           }
        });
    }

    public resetPassword(payload: IResetPassword): Promise<IUser> {
        return new Promise(async (resolve, reject) => {

            if (Otp.compare()) {
                //reset the otp and expiry
                await Otp.resetOtp(payload.email, false);

                //update the password
                const user = await this.authRepository.updateUserFields(payload.email, {
                    password: Password.hash(payload.password),
                    passwordReset: false,
                    status: IStatus.ACTIVE
                });

                return resolve(user);
            }

            return reject({message: 'Invalid OTP'});
        });
    }

    public logout(refreshToken: string, isWeb: boolean, res: Response): Promise<void> {

        return new Promise<void>(async (resolve, reject) => {

            const secret            = process.env.REFRESH_TOKEN_SECRET || '';
            const userValidatedData = <JwtPayload>jwt.verify(refreshToken, secret);

            if (!userValidatedData) return reject({message: 'Invalid credentials'})

            const user = await this.authRepository.findUserByEmail(userValidatedData.email)

            if (!user) throw new Error('Invalid email address')

            const existingRefreshToken: Array<string> | [] = user.security.tokens;

            if (existingRefreshToken.length > 0) {
                await this.authRepository.removeRefreshToken(user.email, refreshToken);
            }

            if (isWeb) {
                Cookies.remove(res);
            }
        })
    }

    public middleware(email: string): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.authRepository.findUserByEmail(email);
                return resolve(user);
            }
            catch (e) {
                return reject(e);
            }
        });
    }

}
