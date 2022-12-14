import {describe, expect, it} from "@jest/globals";
import {SettingsService} from "../settingsService";
import {SettingsServiceMock} from "./mocks";
import {SettingsMocks} from "../../repository/__test__/mocks";

describe('Settings Service Test', () => {

   it('has a module', () => {
       expect(SettingsService).toBeDefined();
   })

    it('should get settings', () => {
        const settingsService = new SettingsService(SettingsServiceMock.services);
        settingsService.getSettings();

        expect(SettingsServiceMock.services.get).toBeCalled();
    });


    it('should update settings', () => {
        const settingsService = new SettingsService(SettingsServiceMock.services);
        settingsService.updateSettings(SettingsMocks.settingsProps);

        expect(SettingsServiceMock.services.set).toBeCalled();
    });


    it('should create settings', () => {
        const settingsService = new SettingsService(SettingsServiceMock.services);
        settingsService.createSettings(SettingsMocks.settingsProps);

        expect(SettingsServiceMock.services.generate).toBeCalled();
    })

});
