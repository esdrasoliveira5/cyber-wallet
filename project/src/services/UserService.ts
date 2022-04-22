import Service from '.';
import {
  ResponseError,
  ResponseLogin,
  ResponseUser,
} from '../interfaces/ResponsesInterface';
import UserModel from '../models/UserModel';
import { Login } from '../types';
import { UserInfo } from '../types/UserInfoType';
import { User } from '../types/UserType';

class UserService extends Service<User | UserInfo> {
  constructor(model = new UserModel()) {
    super(model);
  }

  create = async (obj:UserInfo):
  Promise<ResponseUser<UserInfo> | ResponseError> => {
    const validation = this.validations.userInfo(obj);
    if (validation) return validation;

    const user = await this.model.readOne(obj);
    if (user) {
      return {
        status: this.status.CONFLICT, response: { error: this.errors.CONFLICT },
      };
    }

    const hash = await this.bcrypt.hashIt(obj.password);

    const response = await this.model.create({
      ...obj,
      password: hash,
      transactions: [],
      balance: 0,
    });
    return { status: this.status.CREATED, response };
  };

  login = async (obj: Login):
  Promise<ResponseLogin<User> | ResponseError> => {
    const validation = this.validations.login(obj);
    if (validation) return validation;

    const user = await this.model.readOne({ email: obj.email }) as User;
    if (!user) {
      return {
        status: this.status.NOT_FOUND, 
        response: { error: this.errors.NOT_FOUND },
      };
    }
    return { status: 200, response: { user, token: '' } };
  };
}

export default UserService;