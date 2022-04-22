import { ZodError } from 'zod';

export interface Status {
  status: number;
}

export interface Error {
  error: ZodError | string;
}

export interface ResponseError extends Status {
  response: Error
}

export interface ResponseUser<T> extends Status {
  response: T;
}

export interface ResponseLogin<T> extends Status {
  response: {
    user: T,
    token: string,
  };
}