import { ApiException } from './ApiException';

export class ServerException extends ApiException {
  /**
   *
   * @param {{ message: string, [key: string]: any }} errors
   * @param {Error} [innerException]
   */
  public innerException?: Error;

  constructor(errors: { message: string; [key: string]: any }, innerException?: Error) {
    super(500, errors.message);
    console.log(errors.message)
    this.innerException = innerException;
  }
}
