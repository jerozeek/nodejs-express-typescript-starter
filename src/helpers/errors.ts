import {ZodError} from "zod";
import { MongoServerError } from "mongodb";


export const Errors = (e: ZodError | Error | MongoServerError) => {

    let message: string = '';

    if (e instanceof MongoServerError) {
        let errorMessage = e?.keyPattern;
        for (let key in errorMessage) {
            message = `${key} already exists`;
        }
    }

    else if (e instanceof ZodError) {
        message = e?.errors[0]?.message;
    }

    else message = e.message;

    return message;
}
