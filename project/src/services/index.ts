import { MessageErrors, StatusCodes } from '../enums';
import { Model } from '../interfaces/ModelInterface';
import {
  ResponseError,
  ResponseLogin,
  ResponseUser,
} from '../interfaces/ResponsesInterface';
import { Login } from '../types';
import { Transaction } from '../types/TransactionType';
import { UserInfo } from '../types/UserInfoType';
import Bcrypt from '../validations/Bcrypt';
import JwToken from '../validations/JwtToken';
import ZodValidations from '../validations/ZodValidations';

abstract class Service<T> {
  protected status = StatusCodes;

  protected errors = MessageErrors;

  protected validations = new ZodValidations();

  protected bcrypt = new Bcrypt();

  protected jwt = new JwToken();

  protected response = {
    UNAUTHORIZED: { 
      status: this.status.UNAUTHORIZED,
      response: { error: this.errors.UNAUTHORIZED },
    },
    NOT_FOUND: { 
      status: this.status.NOT_FOUND,
      response: { error: this.errors.NOT_FOUND },
    },
    CONFLICT: {
      status: this.status.CONFLICT, 
      response: { error: this.errors.CONFLICT },
    },
  };

  constructor(public model: Model<T>) {}

  abstract create(obj: T): Promise<ResponseUser<T> | ResponseError>;

  abstract login(obj: Login): Promise<ResponseLogin<T> | ResponseError>;

  abstract readOne(token: string | undefined, id: string):
  Promise<ResponseUser<T> | ResponseError>;

  abstract read(token: string | undefined):
  Promise<ResponseUser<T[]> | ResponseError>;

  abstract update(token: string | undefined, id: string, obj: T | UserInfo):
  Promise<ResponseUser<T> | ResponseError>;

  abstract transaction(token: string | undefined, obj: T | Transaction):
  Promise<ResponseUser<T> | ResponseError>;
}

export default Service;