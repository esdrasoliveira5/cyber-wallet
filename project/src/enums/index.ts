export enum StatusCodes {
  OK = 200,
  CREATED,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INVALID = 422,
  INTERNAL = 500,
}
export enum MessageErrors {
  INTERNAL = 'Internal Server Error',
  NOT_FOUND = 'Not Found',
  BAD_REQUEST = 'Bad Request',
  INVALID_TOKEN = 'Invalid Token',
  INVALID_PASSWORD = 'Invalid Password',
  CONFLICT = 'Conflict',
}