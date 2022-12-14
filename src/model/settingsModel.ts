import {getModelForClass, modelOptions, mongoose, prop, Severity} from "@typegoose/typegoose";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {SETTINGS_ID} from "../modules/Settings/helpers";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    }
})

class Settings extends TimeStamps {

    @prop({required: false, type: String, unique: true, default: SETTINGS_ID})
    settingsId: string

    @prop({required: true,type: mongoose.Schema.Types.Mixed, default: {}})
    paystack: {
        test_secret_key: string,
        test_public_key: string,
        production_secret_key: string,
        production_public_key: string,
        mode: string
    }

    @prop({required: false, type: Boolean, default: false})
    maintenance_mode: boolean

    @prop({required: true, type: String })
    sendGrid: string

    @prop({required: true, type: Number, default: 15 })
    otpExpiry: number

    @prop({required: false, type: String, default: null })
    expo_access_token: string

    @prop({required: false, type: Boolean, default: true })
    force_account_verification: boolean

}

const SettingsModel = getModelForClass(Settings);
export default SettingsModel;
