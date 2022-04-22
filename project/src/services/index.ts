import { MessageErrors, StatusCodes } from '../enums';
import { Model } from '../interfaces/ModelInterface';
import {
  ResponseError,
  ResponseLogin,
  ResponseUser,
} from '../interfaces/ResponsesInterface';
import { Login } from '../types';
import Bcrypt from '../validations/Bcrypt';
import ZodValidations from '../validations/ZodValidations';

abstract class Service<T> {
  protected status = StatusCodes;

  protected errors = MessageErrors;

  protected validations = new ZodValidations();

  protected bcrypt = new Bcrypt();

  constructor(public model: Model<T>) {}

  abstract create(obj: T): Promise<ResponseUser<T> | ResponseError>;

  abstract login(obj: Login): Promise<ResponseLogin<T> | ResponseError>;
}

export default Service;