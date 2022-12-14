import {IRegister, IUser} from "../services/interface";

export interface IAuthRepository {
    findUserByEmail(email: string): Promise<IUser>;
    getUserById(userId: string): Promise<IUser>;
    findUserByPhone(phone: string): Promise<IUser>;
    createUser(payload: IRegister): Promise<IUser>;
    generateAccessToken: (user: IUser) => Promise<string>;
    generateRefreshToken: (user: IUser) => Promise<string>;
    createLogin: (email: string, deviceId: string, deviceType: string) => Promise<IUser>
    updateUserFields: (email: string, data: object) => Promise<IUser>
    removeRefreshToken: (email: string, refreshToken: string) => Promise<void>
}
