import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = "Database connection failed";

    constructor() {
        super("Error connecting to the Database");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}