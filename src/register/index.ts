import {Application} from "express";
import authRoutes from '../modules/Auth/routes';
import settingsRoutes from '../modules/Settings/routes';
import {API_URL} from "../config/constants";

const register = (app: Application) => {
    app.use(`${API_URL}/auth`, authRoutes);
    app.use(`${API_URL}/settings`, settingsRoutes);
}

export = register;
