import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor(message = "Resource not found") {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}