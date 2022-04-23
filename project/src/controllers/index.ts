import { Response, Request } from 'express';
import {
  RequestWithBody,
} from '../interfaces/RequestsInterfaces';

import Service from '../services';

abstract class Controller<T> {
  abstract route: string;

  constructor(public service: Service<T>) {}

  abstract create(req: RequestWithBody<T>, res: Response):
  Promise<typeof res>;

  abstract login(req: RequestWithBody<T>, res: Response):
  Promise<typeof res>;

  abstract readOne(req: RequestWithBody<T>, res: Response):
  Promise<typeof res>;

  abstract read(req: Request, res: Response):
  Promise<typeof res>;

  abstract update(req: RequestWithBody<T>, res: Response):
  Promise<typeof res>;

  abstract transaction(req: RequestWithBody<T>, res: Response):
  Promise<typeof res>;
}

export default Controller;