import {describe, expect, it} from "@jest/globals";
import { AuthService } from "../authService";
import {AuthServiceMock} from "./mock";
import sinon from "sinon";
import {Otp} from "../../helpers/otp";

describe('Auth Service Test', () => {

    it('has a module', () => {
        expect(AuthService).toBeDefined();
    })

    it('should login user', () => {

        const userService = new AuthService(AuthServiceMock.mockAuthRepository);
        userService.login(AuthServiceMock.loginMock);

        expect(AuthServiceMock.mockAuthRepository.createLogin).toBeCalled();
    })

    it('should register a new user', () => {

        const userService = new AuthService(AuthServiceMock.mockAuthRepository);
        userService.register(AuthServiceMock.registerMock);

        expect(AuthServiceMock.mockAuthRepository.createUser).toBeCalled();
    })

    it('should create access token', () => {
        const userService = new AuthService(AuthServiceMock.mockAuthRepository);
        userService.createAccessToken(AuthServiceMock.user);

        expect(AuthServiceMock.mockAuthRepository.generateAccessToken).toBeCalled();
    });

    it('should create refresh token', () => {
        const userService = new AuthService(AuthServiceMock.mockAuthRepository);
        userService.createRefreshToken(AuthServiceMock.user);

        expect(AuthServiceMock.mockAuthRepository.generateRefreshToken).toBeCalled();
    })

    it('should send otp to user email', () => {
        const userService = new AuthService(AuthServiceMock.mockAuthRepository);
        userService.forgotPassword(AuthServiceMock.loginMock.email);
        const otpSpy = sinon.spy();
        otpSpy(Otp.passwordReset);

        expect(AuthServiceMock.mockAuthRepository.findUserByEmail).toBeCalled();
        expect(otpSpy.calledOnce).toBe(true);
    });

    it('should verify otp', () => {
        const userService = new AuthService(AuthServiceMock.mockAuthRepository);

    });

})
