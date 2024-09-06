import { ApiException } from "./ApiException";

/**
 *
 * @param {number} statusCode
 * @param {string} message
 */
export class ForbiddenException extends ApiException {
  constructor(error: { message: string }) {
    super(403, error.message);
  }
}
