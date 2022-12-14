import {describe, expect, it, afterAll, beforeAll, afterEach} from "@jest/globals";
import {AuthRepository} from "../authRepository";
import {AuthRepositoryMock} from "./mocks";
import {Handler} from "../../../../handler";

const userModel = new AuthRepository();

beforeAll(async () => {
   // start the server
   await Handler.startServer();
});

afterEach(async () => {
    // clear the database
    await Handler.dropCollections();
});

afterAll(async () => {
    // close the server
    await Handler.dropMongoDB();
    return  Handler.closeServer();
})


describe('User Model Test', () => {

    it('has a module', () => {
        expect(AuthRepository).toBeDefined();
    });

    it('can find a user by email', async () => {
        const user         = await userModel.createUser(AuthRepositoryMock.createUserMock());
        const findUser      = await userModel.findUserByEmail(AuthRepositoryMock.createUserMock().email);

        expect(findUser).toBeDefined();
        expect(findUser.email).toEqual(user.email);
    });

    it('can find a user by phone', async () => {
        const user         = await userModel.createUser(AuthRepositoryMock.createUserMock());
        const findUser      = await userModel.findUserByPhone(AuthRepositoryMock.createUserMock().phone);

        expect(user.phone).toEqual(findUser.phone);
        expect(findUser).toBeDefined();
        expect(findUser).toHaveProperty('phone');
    });

    it('can create a user and return its properties', async () => {
        const user      = await userModel.createUser(AuthRepositoryMock.createUserMock());

        expect(user).toBeDefined();
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
    });

    it('should generate access token', async () => {
        const user          = await userModel.createUser(AuthRepositoryMock.createUserMock());

        const accessToken   = await userModel.generateAccessToken(user);
        expect(accessToken).toBeDefined();
        expect(accessToken).not.toBeNull();
    });

    it('should generate refresh token and remove it', async () => {
        const user              = await userModel.createUser(AuthRepositoryMock.createUserMock());
        const refreshToken      = await userModel.generateAccessToken(user);
        const removeToken       = await userModel.removeRefreshToken(user.email, refreshToken);

        expect(refreshToken).toBeDefined();
        expect(refreshToken).not.toBeNull();
        expect(removeToken).not.toBeDefined();
    });

    it('can find user by User ID', async () => {
        const user              = await userModel.createUser(AuthRepositoryMock.createUserMock());
        const foundUser         = await userModel.getUserById(user.id);

        expect(foundUser).toBeDefined();
        expect(foundUser).toHaveProperty('firstname');
        expect(foundUser).toHaveProperty('lastname');
    });


    it('can update user data', async () => {
        const user       = await userModel.createUser(AuthRepositoryMock.createUserMock());
        const foundUser  = await userModel.updateUserFields(user.email, {
            firstname: 'John',
            lastname: 'Doe'
        });

        expect(foundUser).toBeDefined();
        expect(foundUser).toHaveProperty('firstname');
        expect(foundUser).toHaveProperty('lastname');
    });


    it('can update last login', async () => {
        const user       = await userModel.createUser(AuthRepositoryMock.createUserMock());
        const foundUser  = await userModel.createLogin(
            user.email,
            AuthRepositoryMock.createUserMock().deviceId,
            AuthRepositoryMock.createUserMock().deviceType
        );

        expect(foundUser).toBeDefined();
        expect(foundUser).toHaveProperty('lastLogin');
    })

})
