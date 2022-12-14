import {AuthRepository} from "../repository/authRepository";
import {AuthService} from "../services/authService";


export const authFactory = () => {
    const authRepository = new AuthRepository();
    return new AuthService(authRepository);
}
