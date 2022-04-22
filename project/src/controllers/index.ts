import { Response } from 'express';
import {
  RequestWithBody,
} from '../interfaces/RequestsInterfaces';

import Service from '../services';

abstract class Controller<T> {
  abstract route: string;

  constructor(public service: Service<T>) {}

  abstract create(req: RequestWithBody<T>, res: Response):
  Promise<typeof res>;
}

export default Controller;