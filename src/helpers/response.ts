import { Response } from 'express';

export const response = (res: Response) => {

    const success = (statusCode: number = 200, message: string = "Action was successful", data: any = {}) => {
        res.status(statusCode)
        res.json({
            status: statusCode,
            message,
            data
        });
        res.end();
    }

    const error = (message: string = "Something went wrong", statusCode: number = 400) => {
        res.status(statusCode)
        res.json({
            status: statusCode,
            message,
        });
        res.end();
    }

    return { success, error }
}