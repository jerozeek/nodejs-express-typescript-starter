import { Router } from 'express';
import {AuthRoute} from "./authRoute";
import {Auth} from "../middleware/authentication";
import {use} from "../../../middleware/use";

const routes = Router();

routes.post('/login', [Auth.login, Auth.settings], use(AuthRoute.login));

routes.post('/register', [Auth.signup, Auth.settings], use(AuthRoute.register));

routes.post('/forget-password', [Auth.authenticate], use(AuthRoute.forgetPassword));

routes.post('/verify-otp', [Auth.otpVerification], use(AuthRoute.verifyOtp));

routes.post('/reset-password', [Auth.resetPassword], use(AuthRoute.resetPassword));

routes.post('/logout', [Auth.logout], use(AuthRoute.logout));

routes.post('/me', [Auth.guard, Auth.settings], use(AuthRoute.logout));

export = routes;
