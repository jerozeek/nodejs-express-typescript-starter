import {IAuthRepository} from "./interface";
import {IRegister, IUser} from "../services/interface";
import UserModel from "../../../model/userModel";
import jwt from "jsonwebtoken";

export class AuthRepository implements IAuthRepository {

    public async createUser(payload: IRegister) {
        return await UserModel.create(payload) as unknown as IUser;
    }

    public async findUserByEmail(email: string): Promise<IUser> {
        return await UserModel.findOne({email}) as IUser;
    }

    public async getUserById(userId: string) {
        return await UserModel.findById(userId) as IUser;
    }

    public async findUserByPhone(phone: string): Promise<IUser> {
        return await UserModel.findOne({phone}) as IUser;
    }

    public async generateAccessToken(user: IUser): Promise <string> {
        const tokenKey      = process.env.ACCESS_TOKEN_SECRET || '';
        const expiryTime    = process.env.ACCESS_TOKEN_EXPIRY || '1h';
        return jwt.sign({id: user.id, email: user.email, role: user.role}, tokenKey, {expiresIn: expiryTime});
    }

    public async generateRefreshToken (user: IUser): Promise <string> {
        const tokenKey      = process.env.REFRESH_TOKEN_SECRET || '';
        const expiryTime    = process.env.REFRESH_TOKEN_EXPIRY || '30d';
        const refreshToken  = jwt.sign({ id: user.id, email: user.email, role: user.role}, tokenKey, { expiresIn: expiryTime});
        const existingRefreshToken: any | [] = user.security.tokens;

        if (existingRefreshToken.length < 5)
        {
            //generate new refresh token
            await UserModel.updateOne({email: user.email}, {$push: {"security.tokens": {refreshToken, createdAt: new Date()}}});
        }
        else
        {
            //pull all token out from the box....
            await UserModel.updateOne({email: user.email}, {$pull: {"security.tokens": {_id: existingRefreshToken[0]._id}}});

            //push a new token........
            await UserModel.updateOne({email: user.email}, {$push: {"security.tokens": {refreshToken, createdAt: new Date()}}});
        }

        return refreshToken;
    }

    public async createLogin(email: string, deviceId: string, deviceType: string) {
        return await UserModel.findOneAndUpdate({email}, {$set: {deviceId, deviceType, lastLogin: new Date()}}, {new: true}) as IUser
    }

    public async updateUserFields(email: string, data:object) {
        return await UserModel.findOneAndUpdate({email}, {$set: data}, {new: true}) as IUser;
    }

    public async removeRefreshToken(email: string, refreshToken: string): Promise<void> {
        await UserModel.updateOne({email}, {$pull: {"security.tokens": {refreshToken}}});
    }

}
