import { CustomError } from "./custom-error";

export class NotAuthorizedErro extends CustomError {
    statusCode = 401;
    reason = 'Not Authorized';
    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, NotAuthorizedErro.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}