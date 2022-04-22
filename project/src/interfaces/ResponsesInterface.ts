import { ZodError } from 'zod';

export interface Status {
  status: number;
}

export interface Error {
  error: ZodError | string;
}

export interface Token<T> {
  user: T,
  token: string,
}

export interface ResponseError extends Status {
  response: Error
}

export interface ResponseUser<T> extends Status {
  response: T;
}

export interface ResponseLogin<T> extends Status {
  response: Token<T>,
}