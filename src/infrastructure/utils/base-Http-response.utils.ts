export class BaseHttpResponse<T = any, E = any> {
  public success: boolean;
  public message?: string;
  public data?: T;
  public error?: E;

  /**
   * Constructs a new BaseHttpResponse instance.
   *
   * @param {boolean} success - Indicates whether the operation was successful.
   * @param {string} [message] - An optional message providing additional information.
   * @param {T} [data] - Optional data associated with a successful response.
   * @param {E} [error] - Optional error information in case of failure.
   */
  constructor(success: boolean, message: string, data?: T, errors?: E) {
    this.success = success;
    this.message = message ?? undefined;
    this.data = data;
    this.error = errors;
  }

  /**
   * Creates a success response with optional data.
   *
   * @param {string} message - The message to include in the response.
   * @param {T} [data] - Optional data to include in the response.
   * @returns {BaseHttpResponse<T>} - A new instance of BaseHttpResponse representing a successful operation.
   */
  static success<T>(message: string, data?: T): BaseHttpResponse<T> {
    return new BaseHttpResponse<T>(true, message, data, undefined);
  }

  /**
   * Creates a failure response with optional error details.
   * 
   * @param {string} message - The message to include in the response.
   * @param {E} [error] - Optional error details to include in the response.
   * @returns {BaseHttpResponse<T, E>} - A new instance of BaseHttpResponse representing a failed operation.
   */
  static failed<E>(message: string, errors?: E): BaseHttpResponse<any, E> {
    return new BaseHttpResponse<any, E>(false, message, undefined, errors);
  }

    /**
   * Converts the response object to a JSON representation.
   * 
   * @returns {object} - A plain object representation of the BaseHttpResponse instance.
   */
    toJSON(): object {
      return {
        success: this.success,
        message: this.message,
        data: this.data,
        error: this.error
      };
    }
}
