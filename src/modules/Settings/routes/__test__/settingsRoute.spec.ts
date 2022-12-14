import { expect, it, describe, beforeAll, afterAll } from "@jest/globals";
import {Handler} from "../../../../handler";
import {SettingsMocks} from "../../repository/__test__/mocks";
import {GET, POST} from "../../../../helpers";

beforeAll(async () => {
    await Handler.startServer();
})

afterAll(async () => {
    await Handler.dropMongoDB();
    await Handler.closeServer();
})

describe("Settings Route", () => {

    it("should create settings", async () => {
        const res = await POST('settings/create', SettingsMocks.settingsProps);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Settings created successfully');
    });

    it("should throw error settings already exist", async () => {
        const res = await POST('settings/create', SettingsMocks.settingsProps);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('settingsId already exists');
    });

    it("should update settings", async () => {
        const res = await POST('settings/set', SettingsMocks.settingsProps);

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.message).toBe('Settings updated successfully');
    });

    it("should get settings", async () => {
        const res = await GET('settings/get');

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.message).toBe('Settings fetched successfully');
        expect(res.body.data).toHaveProperty('paystack');
    });

});





