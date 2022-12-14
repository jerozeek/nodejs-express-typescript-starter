export enum PaystackMode {
    TEST = "test",
    PRODUCTION = "production"
}

export enum ResponseFactoryType {
    verification = "verification",
    login = "login",
    signup = "signup",
    middleware = "middleware"
}

export interface ISettings {
    settingsId: string;
    paystack: {
        test_secret_key: string,
        test_public_key: string,
        production_secret_key: string,
        production_public_key: string,
        mode: PaystackMode
    },
    maintenance_mode: boolean,
    sendGrid: string,
    otpExpiry: number,
    expo_access_token: string,
    force_account_verification: boolean
}

export interface ISettingsPayload {
    paystack: {
        test_secret_key: string,
        test_public_key: string,
        production_secret_key: string,
        production_public_key: string,
        mode: PaystackMode
    },
    maintenance_mode: boolean,
    sendGrid: string,
    otpExpiry: number,
    expo_access_token: string,
    force_account_verification: boolean
}

export interface ISettingsRepository {
    get(): Promise<ISettings>
    set(payload: ISettingsPayload): Promise<ISettings>
    generate(payload: ISettingsPayload): Promise<ISettings>
}
