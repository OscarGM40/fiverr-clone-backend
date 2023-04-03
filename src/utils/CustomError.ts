export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpException extends Error {
  public readonly message: string;
  public readonly statusCode: HttpCode;

  constructor(statusCode: HttpCode, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
