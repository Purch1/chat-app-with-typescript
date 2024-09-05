import { ApiException } from './ApiException';

/**
 *
 * @param {number} statusCode
 * @param {string} message
 * @param {message} string}
 */
export class ValidationException extends ApiException {
  constructor(error: { path: string; message: string }) {
    super(400, error.message);
  }
}
