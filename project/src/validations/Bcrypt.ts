import bcrypt = require('bcrypt');
import { MessageErrors, StatusCodes } from '../enums';
import { ResponseError } from '../interfaces/ResponsesInterface';

class Bcrypt {
  private salt: string;

  private status = StatusCodes;

  private error = MessageErrors;

  constructor() {
    this.salt = bcrypt.genSaltSync(10);
  }

  async hashIt(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, this.salt);
    return hashed;
  }

  async compareIt(password: string, hashedPassword: string):
  Promise<void | ResponseError> {
    const response = await bcrypt.compare(password, hashedPassword);
    if (!response) {
      return {
        status: this.status.UNAUTHORIZED,
        response: { error: this.error.INVALID_PASSWORD },
      };
    }
  }
}

export default Bcrypt;