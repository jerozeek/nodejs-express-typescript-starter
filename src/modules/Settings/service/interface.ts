import {ISettings, ISettingsPayload} from "../repository/interface";

export interface ISettingsService {
    getSettings(): Promise<ISettings>
    updateSettings(payload: ISettingsPayload): Promise<ISettings>
    createSettings(payload: ISettingsPayload): Promise<ISettings>
}
