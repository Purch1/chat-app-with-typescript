export class ApiException extends Error {
    status: number;
    errors: string;
    path: string;
  
    constructor(httpStatusCode: number, errors: string, path: string) {
      super();
      Object.setPrototypeOf(this, new.target.prototype);
  
      this.status = httpStatusCode;
      this.errors = errors;
      this.path = path;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  