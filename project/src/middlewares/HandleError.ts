import { NextFunction, Request, Response } from 'express';

class HandleError {
  genericError = (
    err: Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ) => {
    console.error(err);
    return res.status(500).json({ error: `Erro: ${err.message}` });
  };
}

export default HandleError;