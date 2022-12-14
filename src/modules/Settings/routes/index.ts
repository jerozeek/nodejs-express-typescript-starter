import {Router} from "express";
import {Settings} from "../middleware/settingsGuard";
import {use} from "../../../middleware/use";
import {SettingsRoute} from "./settingsRoute";

const routes = Router();

routes.get('/get', [Settings.guard], use(SettingsRoute.getSettings));
routes.post('/set', [Settings.Auth], use(SettingsRoute.updateSettings));
routes.post('/create', [Settings.Auth], use(SettingsRoute.createSettings));

export = routes;
