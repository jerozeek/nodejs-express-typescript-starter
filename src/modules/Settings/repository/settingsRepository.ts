import {ISettings, ISettingsPayload, ISettingsRepository} from "./interface";
import SettingsModel from "../../../model/settingsModel";
import {SETTINGS_ID} from "../helpers";

export class SettingsRepository implements ISettingsRepository {

    public async get(): Promise<ISettings> {
        return await SettingsModel.findOne({settingsId: SETTINGS_ID}) as ISettings;
    }

    public async set(payload: ISettingsPayload): Promise<ISettings> {
        return await SettingsModel.findOneAndUpdate({settingsId: SETTINGS_ID}, payload, {new: true}) as ISettings;
    }

    public async generate(payload: ISettingsPayload): Promise<ISettings> {
        return await SettingsModel.create(payload) as ISettings;
    }

}
