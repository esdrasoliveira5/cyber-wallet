import Service from '.';
import {
  ResponseError,
  ResponseUser,
} from '../interfaces/ResponsesInterface';
import UserModel from '../models/UserModel';
import { UserInfo } from '../types/UserInfoType';
import { User } from '../types/UserType';

class UserService extends Service<User | UserInfo> {
  constructor(model = new UserModel()) {
    super(model);
  }

  create = async (obj:UserInfo):
  Promise<ResponseUser<UserInfo> | ResponseError> => {
    const response = await this.model.create({
      ...obj,
      transactions: [],
      balance: 0,
    });
    return { status: this.status.CREATED, response };
  };
}

export default UserService;