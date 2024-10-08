import { ApiException } from "./ApiException";

/**
 *
 * @param {number} statusCode
 * @param {string} message
 */
export class NotFoundException extends ApiException {
  constructor(error: string | { message: string; path?: string }) {
    const err = typeof error === 'string' ? { message: error } : error;
    super(404, err.message);
  }
}
