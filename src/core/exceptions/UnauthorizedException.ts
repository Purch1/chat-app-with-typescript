import { ApiException } from "./ApiException";

/**
 *
 * @param {number} statusCode
 * @param {string} message
 */
export class UnauthorizedException extends ApiException {
  constructor(error: { message: string }) {
    super(401, error.message);
  }
}
