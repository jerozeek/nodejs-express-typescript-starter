import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import {Handler} from "../../../../handler";
import {AuthRepositoryMock} from "../../repository/__test__/mocks";
import {POST} from "../../../../helpers";

beforeAll(async () => {
    await Handler.startServer();
});

afterAll(async () => {
    await Handler.dropMongoDB();
    await Handler.closeServer();
});



describe.only("Auth Route", () => {

    it('should create a new user', async () => {
        const res = await POST('auth/register', AuthRepositoryMock.createUserMock());

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Account created successfully');
    });

    it('should throw error if user already exist', async () => {
        const res = await POST('auth/register', AuthRepositoryMock.createUserMock());

        expect(res.statusCode).toEqual(400);
    });

    it('should login a user', async () => {
        const res = await POST('auth/login', AuthRepositoryMock.loginUserMock());

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Login was successful');
    });

});
