import { Response } from "express";
import { HttpStatusCode } from "../utils/HttpStatusCode";

interface ResponsePayload {
    message: string;
    data?: unknown;
    error?: unknown;
}

export const responseHandler = (
    res: Response,
    status: HttpStatusCode,
    message: string,
    data?: unknown,
    error?: unknown
) => {
    const payload: ResponsePayload = { message };
    if (data) payload.data = data;
    if (error) payload.error = error;

    return res.status(status).json(payload);
};
