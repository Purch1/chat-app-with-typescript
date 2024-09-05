import { ApiException } from "./ApiException";

export class NotFoundException extends ApiException {
  constructor(path: string, message: string = 'Resource not found') {
    super(404, message, path);
  }
}
