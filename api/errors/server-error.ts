import { CustomError } from './custom-error';

export class ServerError extends CustomError {
  statusCode = 500;

  constructor(public error: any) {
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeErrors() {
      return [{ message: this.error.message}];
  }
}