import { NextFunction, Request, Response } from 'express';
import JwToken from '../validations/JwtToken';

class HandleAuthorization {
  protected jwt = new JwToken();

  genericError = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { authorization } = req.headers;

    const jwtToken = this.jwt.validate(authorization); 
    if ('status' in jwtToken) {
      return res.status(jwtToken.status).json(jwtToken.response);
    }

    next();
  };
}

export default HandleAuthorization;