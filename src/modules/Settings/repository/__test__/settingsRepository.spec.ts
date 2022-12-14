import {describe, expect, it, afterAll, beforeAll, afterEach} from "@jest/globals";
import {SettingsRepository} from "../settingsRepository";
import {Handler} from "../../../../handler";
import {SettingsMocks} from "./mocks";

const settingsModel = new SettingsRepository();

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


describe('Settings Model Test', () => {


    it('has a module', () => {
        expect(SettingsRepository).toBeDefined();
    });


    it("can create a settings", async () => {
        const settings = await settingsModel.generate(SettingsMocks.settingsProps);

        expect(settings).toBeDefined();
        expect(settings).toHaveProperty('settingsId');
    });


    it("can get a settings", async () => {
        await settingsModel.generate(SettingsMocks.settingsProps);
        const settings   = await settingsModel.get();

        expect(settings).toBeDefined();
        expect(settings).toHaveProperty('settingsId');
    });


    it("can update a settings", async () => {
        await settingsModel.generate(SettingsMocks.settingsProps);
        const settings = await settingsModel.set(SettingsMocks.settingsProps);

        expect(settings).toBeDefined();
        expect(settings).toHaveProperty('settingsId');
    });


});
