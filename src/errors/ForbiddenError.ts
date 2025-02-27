import { CustomError } from "./CustomError";

export class ForbiddenError extends CustomError 
 {
    statusCode: number = 403;

    constructor() {
        super("Forbidden");
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }

    serializeErrors(): { message: string }[] {
        return [{ message: "Forbidden" }];
    }
}