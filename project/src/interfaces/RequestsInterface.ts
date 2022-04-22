import { Request } from 'express';

export interface RequestWithBody<T> extends Request {
  body: T;
}

export interface RequestWithParams extends Request {
  params: { id: string };
}
