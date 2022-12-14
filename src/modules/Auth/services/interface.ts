import {Response} from "express";

export interface IAuth {
    email: string;
    password: string;
    deviceId: string;
    deviceType: string;
}

type ISecurity = {
    tokens: [refreshToken: string, createdAt: string]
}

export enum IStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    DISABLED = 'disabled',
    BLOCKED = 'blocked'
}

export interface IUserSettings {
    allowNotifications: boolean;
    allowBiometrics: boolean;
    allowTwoFactor: boolean;
}

export interface IRegister extends IAuth {
    firstname: string;
    lastname: string;
    phone: string;
}

export interface IResetPassword {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    pin: string | null;
    image: string | null;
    passwordReset: boolean;
    deviceId: string | null;
    deviceType: string;
    otpExpiry: string;
    otp: string;
    role: string;
    otpExpires: string;
    status: IStatus,
    settings: IUserSettings;
    security: ISecurity;
    lastLogin: string;
    createdAt: string;
}

export interface AuthServiceInterface {
    login: (payload: IAuth) => Promise<IUser>
    register: (payload: IRegister) => Promise<IUser>
    forgotPassword: (string: string) => Promise<IUser>
    resetPassword: (payload: IResetPassword) => Promise<IUser>
    logout: (refreshToken: string, isWeb: boolean, res: Response) => Promise<void>
    createAccessToken:(user:IUser) => Promise<string>
    createRefreshToken:(user:IUser) => Promise<string>
    verifyOtp: (email: string) => Promise<IUser | boolean>
    middleware:(email: string) => Promise<IUser>
}
