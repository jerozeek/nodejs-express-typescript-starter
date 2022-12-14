import {IAuth, IRegister, IResetPassword, IUser} from "../interface";
import sinon from "sinon";
import {IAuthRepository} from "../../repository/interface";
import {faker} from "@faker-js/faker";

export class AuthServiceMock {

    public static user: IUser;

    public static loginMock: IAuth = {
        email: faker.internet.email(faker.name.firstName(), faker.name.lastName()),
        password: faker.internet.password(16),
        deviceId: faker.internet.mac('##:##:##:##:##:##'),
        deviceType: "android"
    }

    public static resetPasswordMock: IResetPassword = {
        email: faker.internet.email(faker.name.firstName(), faker.name.lastName()),
        password: faker.internet.password(16),
        confirmPassword: faker.internet.password(16),
    }

    public static registerMock: IRegister = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(faker.name.firstName(), faker.name.lastName()),
        password: faker.internet.password(16),
        deviceId: faker.internet.mac('##:##:##:##:##:##'),
        deviceType: "android",
        phone: faker.phone.number('+234##########'),
    }

    public static mockAuthRepository: IAuthRepository = {
        findUserByEmail: sinon.stub(),
        getUserById: sinon.stub(),
        findUserByPhone: sinon.stub(),
        createUser: sinon.stub(),
        generateAccessToken: sinon.stub(),
        generateRefreshToken: sinon.stub(),
        createLogin: sinon.stub(),
        updateUserFields: sinon.stub(),
        removeRefreshToken: sinon.stub()
    }
}
