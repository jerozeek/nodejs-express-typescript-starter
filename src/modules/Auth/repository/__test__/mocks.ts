import {IAuth, IRegister} from "../../services/interface";

export class AuthRepositoryMock {

    public static createUserMock(): IRegister {
        return {
            firstname: "Jerry",
            lastname: "Kalu",
            email: "jerozeek2@gmail.com",
            phone: "08100000000",
            password: "1234567890",
            deviceId: "1234567890",
            deviceType: "android"
        }
    }

    public static loginUserMock(): IAuth {
        return {
            email: "jerozeek2@gmail.com",
            password: "1234567890",
            deviceId: "1234567890",
            deviceType: "android"
        }
    }
}
