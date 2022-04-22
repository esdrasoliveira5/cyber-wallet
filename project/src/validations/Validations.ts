import { MessageErrors, StatusCodes } from '../enums';
import { ResponseError } from '../interfaces/ResponsesInterface';
import { Transaction, TransactionSchema } from '../types/TransactionType';
import { UserBasicInfo, UserBasicInfoSchema } from '../types/UserBasicInfoType';
import { UserInfo, UserInfoSchema } from '../types/UserInfoType';
import { User, UserSchema } from '../types/UserType';

class Validations {
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

  userInfo = (obj: UserInfo): void | ResponseError => {
    const userError = this.userBasic(obj);
    if (userError) return userError;

    const parsedCustomer = UserInfoSchema.safeParse(obj);
    if (!parsedCustomer.success) {
      return {
        status: this.status.BAD_REQUEST,
        response: { error: parsedCustomer.error },
      };
    }
  };

  user = (obj: User): void | ResponseError => {
    const userError = this.userInfo(obj);
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

  idValidations = (id: string): void | ResponseError => {
    if (id.length < 24) {
      return {
        status: this.status.BAD_REQUEST,
        response: { error: 'Id must have 24 hexadecimal characters' },
      };
    }
  };
}
export default Validations;
