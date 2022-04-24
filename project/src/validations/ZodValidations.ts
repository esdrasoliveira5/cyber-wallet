import { MessageErrors, StatusCodes } from '../enums';
import fetchViaCep from '../fetch';
import { ResponseError } from '../interfaces/ResponsesInterface';
import { Transaction, TransactionSchema } from '../types/TransactionType';
import { UserBasicInfo, UserBasicInfoSchema } from '../types/UserBasicInfoType';
import { UserIdSchema } from '../types/UserIdType';
import { UserInfo, UserInfoSchema } from '../types/UserInfoType';
import { User, UserSchema } from '../types/UserType';

class ZodValidations {
  public error = MessageErrors;

  public status = StatusCodes;

  userBasic = (obj: UserBasicInfo): void | ResponseError => {
    const parsedUser = UserBasicInfoSchema.safeParse(obj);
    if (!parsedUser.success) {      
      return {
        status: this.status.BAD_REQUEST,
        response: { error: parsedUser.error },
      };
    }
  };

  userInfo = async (obj: UserInfo): Promise< void | ResponseError> => {
    const userError = this.userBasic(obj);
    if (userError) return userError;

    const parsedUser = UserInfoSchema.safeParse(obj);
    if (!parsedUser.success) {
      return {
        status: this.status.BAD_REQUEST,
        response: { error: parsedUser.error },
      };
    }

    const cep = await fetchViaCep(obj.address.zipcode);
    
    if ('erro' in cep) {
      return {
        status: this.status.BAD_REQUEST,
        response: { error: 'invalid zipcode' },
      };
    }
  };

  user = async (obj: User): Promise<void | ResponseError> => {
    const userError = await this.userInfo(obj);
    if (userError) return userError;

    const parsedWorker = UserSchema.safeParse(obj);
    if (!parsedWorker.success) {
      return {
        status: this.status.BAD_REQUEST,
        response: { error: parsedWorker.error },
      };
    }
  };

  transaction = (obj: Transaction): void | ResponseError => {
    const parsedWorker = TransactionSchema.safeParse(obj);
    if (!parsedWorker.success) {
      return {
        status: this.status.BAD_REQUEST,
        response: { error: parsedWorker.error },
      };
    }
  };

  userId = (id: string): void | ResponseError => {
    const parsedId = UserIdSchema.safeParse({ _id: id });
    if (!parsedId.success) {
      return {
        status: this.status.BAD_REQUEST,
        response: { error: parsedId.error },
      };
    }
  };

  userUpdate = async (id: string, obj: UserInfo):
  Promise<void | ResponseError> => {
    const userError = await this.userInfo(obj);
    if (userError) return userError;
    
    const parsedId = UserIdSchema.safeParse({ _id: id });
    if (!parsedId.success) {
      return {
        status: this.status.BAD_REQUEST,
        response: { error: parsedId.error },
      };
    }
  };

  login = (obj: Partial<User>): void | ResponseError => {
    const { email, password } = obj;

    if (email === undefined || typeof (email) !== 'string') {
      return {
        status: this.status.BAD_REQUEST,
        response: { error: 'invalid email' },
      };
    }
    if (password === undefined || typeof (email) !== 'string') {
      return {
        status: this.status.BAD_REQUEST,
        response: { error: 'invalid password' },
      };
    }
  };
}
export default ZodValidations;
