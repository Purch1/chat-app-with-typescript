export class ValidationException extends ApiException {
    constructor(path: string, errors: string) {
      super(400, errors, path);
    }
  }