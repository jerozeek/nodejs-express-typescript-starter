import {z} from "zod";
import {PaystackMode} from "../repository/interface";

const settingsSchema = z.object({
    paystack: z.object({
        test_secret_key: z.string(),
        test_public_key: z.string(),
        production_secret_key: z.string(),
        production_public_key: z.string(),
        mode: z.enum([PaystackMode.TEST, PaystackMode.PRODUCTION])
    }),
    maintenance_mode: z.boolean(),
    sendGrid: z.string(),
    otpExpiry: z.number(),
    expo_access_token: z.string(),
    force_account_verification: z.boolean(),
});

export  = {
    settingsSchema
}
