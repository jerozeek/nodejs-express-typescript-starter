import {getModelForClass, modelOptions, mongoose, prop, Severity} from "@typegoose/typegoose";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
})


class Users extends TimeStamps {

    @prop({required: true, lowercase: true, type:String, minlength: 3, maxlength: 50})
    firstname: string

    @prop({required: true, lowercase: true, type:String, minlength: 3, maxlength: 50})
    lastname: string;

    @prop({required: true, lowercase: true, type: String, unique: true, trim: true})
    email: string;

    @prop({required: true, type: String})
    password: string;

    @prop({ required: true, minlength: 11, maxlength: 11, type: String, unique: true, trim: true })
    phone: string;

    @prop({required:false, default: null, type: String })
    deviceId: string;

    @prop({required:true, type: String })
    deviceType: string;

    @prop({ type: String, required: false, default: null })
    otp: string;

    @prop({ type: String, required: false, default: null })
    otpExpiry: string;

    @prop({ required: false, type: String,  default: null})
    image: string;

    @prop({ enum: ['pending', 'active', 'disabled', 'blocked'], default: 'pending', type: String })
    status: string;

    @prop({ default: false, type: Boolean })
    passwordReset: boolean;

    @prop({ required: false, default: {tokens: []}, type: mongoose.Schema.Types.Mixed  })
    security: {tokens: [refreshToken: string, createdAt: string]}

    @prop({ required: false, default: { allowNotifications: true, allowBiometrics: false, allowTwoFactor: false}, type: mongoose.Schema.Types.Mixed  })
    settings: {
        allowNotifications: boolean
        allowBiometrics: boolean
        allowTwoFactor: boolean
    }

    @prop({ type: String, enum: ['user', 'admin'], default: 'user' })
    role: string;

    @prop({ type: String, default: new Date() })
    lastLogin: string

    @prop({ required: false, type: String, default: null})
    pin: string;

}

const UserModel = getModelForClass(Users);
export default UserModel;
