import { MessageErrors, StatusCodes } from '../enums';
import { Model } from '../interfaces/ModelInterface';
import {
  ResponseError,
  ResponseUser,
} from '../interfaces/ResponsesInterface';
import ZodValidations from '../validations/ZodValidations';

abstract class Service<T> {
  protected status = StatusCodes;

  protected errors = MessageErrors;

  protected validations = new ZodValidations();

  constructor(public model: Model<T>) {}

  abstract create(obj: T): Promise<ResponseUser<T> | ResponseError>;
}

export default Service;