import { sign, SignOptions, verify } from 'jsonwebtoken';
import * as path from 'path';
import fs = require('fs');
import { MessageErrors, StatusCodes } from '../enums';
import { ResponseError } from '../interfaces/ResponsesInterface';
import { TokenType } from '../types';

class JwToken {
  private secret: string;

  private jwtConfig: SignOptions;

  private status = StatusCodes;

  private error = MessageErrors;

  constructor() {
    this.secret = fs.readFileSync(path.resolve('jwt.evaluation.key'), 'utf8');
    this.jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  }

  generate(data: TokenType): string {
    const token: string = sign(data, this.secret, this.jwtConfig);
    return token;
  }

  validate(token: string | undefined): ResponseError | TokenType {
    if (token === undefined) {
      return {
        status: this.status.UNAUTHORIZED,
        response: { error: this.error.INVALID_TOKEN },
      };
    }
    try {
      const decoded = verify(token, this.secret) as TokenType;
      return decoded;
    } catch (err) {
      return {
        status: this.status.UNAUTHORIZED,
        response: { error: this.error.INVALID_TOKEN },
      };
    }
  }
}
export default JwToken;