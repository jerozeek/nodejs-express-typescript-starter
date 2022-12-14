import {ISettingsPayload, PaystackMode} from "../interface";
import {faker} from "@faker-js/faker";


export class SettingsMocks {

    public static settingsProps: ISettingsPayload = {
        paystack: {
            test_secret_key: faker.random.words(20),
            test_public_key: faker.random.words(20),
            production_secret_key: faker.random.words(20),
            production_public_key: faker.random.words(20),
            mode: PaystackMode.TEST
        },
        maintenance_mode: false,
        sendGrid: faker.random.words(20),
        otpExpiry: 10,
        expo_access_token: faker.random.words(25),
        force_account_verification: false
    }


}
