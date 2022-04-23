import { MessageErrors, StatusCodes } from '../enums';
import { Model } from '../interfaces/ModelInterface';
import {
  ResponseError,
  ResponseLogin,
  ResponseUser,
} from '../interfaces/ResponsesInterface';
import { Login } from '../types';
import Bcrypt from '../validations/Bcrypt';
import JwToken from '../validations/JwtToken';
import ZodValidations from '../validations/ZodValidations';

abstract class Service<T> {
  protected status = StatusCodes;

  protected errors = MessageErrors;

  protected validations = new ZodValidations();

  protected bcrypt = new Bcrypt();

  protected jwt = new JwToken();

  constructor(public model: Model<T>) {}

  abstract create(obj: T): Promise<ResponseUser<T> | ResponseError>;

  abstract login(obj: Login): Promise<ResponseLogin<T> | ResponseError>;

  abstract readOne(token: string | undefined, id: string):
  Promise<ResponseUser<T> | ResponseError>;

  abstract read(token: string | undefined):
  Promise<ResponseUser<T[]> | ResponseError>;
}

export default Service;