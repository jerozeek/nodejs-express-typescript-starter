import {NextFunction, Request, Response} from "express";
import {settingsFactory} from "../factory/settingsFactory";
import {response} from "../../../helpers/response";
import validations from "../validations";
import {ISettingsPayload} from "../repository/interface";
import {Errors} from "../../../helpers/errors";

export class Settings {

    public static settingsProps: ISettingsPayload;

    public static async guard(req: Request, res: Response, next: NextFunction) {
        const settings = await settingsFactory().getSettings();
        if (settings) return next();
        return response(res).error('Settings not found', 404);
    }

    public static Auth(req: Request, res: Response, next: NextFunction) {
        try {
            Settings.settingsProps  = validations.settingsSchema.parse(req.body);
            next();
        }
        catch (e:any) {
            return response(res).error(Errors(e), 400);
        }
    }

}
