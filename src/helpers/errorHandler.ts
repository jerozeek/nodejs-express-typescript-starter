import {ErrorRequestHandler, Response} from "express";
import {Errors} from "./errors";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    return KeyPatternErrorResponse(err, res)
}

export const KeyPatternErrorResponse = (e: any, res: Response) => {
    const errorMessage = Errors(e);
    return throw_exception(errorMessage, res);
}

export const throw_exception = (message: string, res: Response) => {
    return res.status(500).json({
        status: 500,
        message
    })
}
