import {SettingsRepository} from "../repository/settingsRepository";
import {SettingsService} from "../service/settingsService";

export const settingsFactory = () => {
    const settingsRepository = new SettingsRepository();
    return new SettingsService(settingsRepository);
}
