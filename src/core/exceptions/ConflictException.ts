import { ApiException } from './ApiException';

/**
 * @param {number} statusCode
 * @param {string} message
 */
export class ConflictException extends ApiException {
  constructor(error: { message: string; path: string }) {
    super(409, error.message);
  }
}
