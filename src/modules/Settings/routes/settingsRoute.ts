import { Request, Response } from "express";
import {settingsFactory} from "../factory/settingsFactory";
import {Settings} from "../middleware/settingsGuard";
import {response} from "../../../helpers/response";
import {SettingsResource} from "../resource";
import {Errors} from "../../../helpers/errors";

export class SettingsRoute {

    private static settingsService = settingsFactory();

    public static getSettings(req: Request, res: Response) {
        SettingsRoute.settingsService.getSettings().then((settings) => {
            return response(res).success(200, 'Settings fetched successfully', new SettingsResource(settings).all());
        }).
        catch((e:any) => {
            return response(res).error(Errors(e), 400);
        })
    }

    public static updateSettings(req: Request, res: Response) {
        SettingsRoute.settingsService.updateSettings(Settings.settingsProps).then((settings) => {
            return response(res).success(200, 'Settings updated successfully', settings);
        }).
        catch((e:any) => {
            return response(res).error(Errors(e), 400);
        })
    }

    public static createSettings(req: Request, res: Response) {
        SettingsRoute.settingsService.createSettings(Settings.settingsProps).then((settings) => {
            return response(res).success(200, 'Settings created successfully', settings);
        }).
        catch((e:any) => {
            return response(res).error(Errors(e), 400);
        })
    }

}
