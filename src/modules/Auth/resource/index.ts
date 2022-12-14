import {IUser} from "../services/interface";


export class UserResource {

    private data : any;

    constructor(private user: IUser) {
        this.set(user);
    }

    private set(user: IUser) {
        this.data = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            image: user.image,
            role: user.role,
            pin: user.pin === null ? 'not_set' : 'set',
            deviceId: user.deviceId,
            deviceType: user.deviceType,
            status: user.status,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
        }
    }

    public get() {
        return this.data;
    }

    public withOut (data: Array<string>){
        const usersKeys = Object.keys(this.data);
        for (const userKey of usersKeys) {
            data.forEach((value => {
                if (value === userKey) {
                    delete this.data[value];
                }
            }))
        }
        return this.data;
    }

}
