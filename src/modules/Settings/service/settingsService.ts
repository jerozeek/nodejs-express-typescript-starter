import {ISettingsService} from "./interface";
import {ISettings, ISettingsPayload, ISettingsRepository} from "../repository/interface";

export class SettingsService implements ISettingsService {

    constructor(private settingsRepository: ISettingsRepository) {}

    public getSettings(): Promise<ISettings> {
        return new Promise(async (resolve) => {
            const settings = await this.settingsRepository.get();
            return resolve(settings);
        });
    }

    public updateSettings(payload: ISettingsPayload): Promise<ISettings> {
        return new Promise(async (resolve, reject) => {
            try {
                const settings = await this.settingsRepository.set(payload);
                return resolve(settings);
            }
            catch (e) {
                return reject(e);
            }
        })
    }

    public createSettings(payload: ISettingsPayload): Promise<ISettings> {
        return new Promise(async (resolve, reject) => {
            try {
                const settings = await this.settingsRepository.generate(payload);
                return resolve(settings);
            }
            catch (e) {
                return reject(e);
            }
        })
    }

}
