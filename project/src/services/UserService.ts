import Service from '.';
import {
  ResponseError,
  ResponseLogin,
  ResponseUser,
} from '../interfaces/ResponsesInterface';
import UserModel from '../models/UserModel';
import { Login } from '../types';
import { UserId } from '../types/UserIdType';
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

    const user = await this.model.readOne({ email: obj.email });
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

    const user = await this.model.readOne({ email: obj.email }) as UserId;
    if (!user) {
      return {
        status: this.status.NOT_FOUND, 
        response: { error: this.errors.NOT_FOUND },
      };
    }
    const password = await this.bcrypt.compareIt(obj.password, user.password);
    if (password) return password;

    const newToken = this.jwt.generate({
      id: user._id,
      email: user.email,
    });

    return { status: 200, response: { user, token: newToken } };
  };

  readOne = async (token:string, id: string):
  Promise<ResponseUser<User> | ResponseError> => {
    const jwtToken = this.jwt.validate(token); 
    if ('status' in jwtToken) return jwtToken;
    const validation = this.validations.userId(id);
    if (validation) return validation;

    const userToken = await this.model.readOne({ _id: jwtToken.id }) as UserId;
    if (!userToken) {
      return {
        status: 401, response: { error: this.errors.UNAUTHORIZED },
      };
    }

    const user = await this.model.readOne({ _id: id }) as UserId;
    if (!user) {
      return {
        status: 404, response: { error: this.errors.NOT_FOUND },
      };
    }
    return { status: this.status.OK, response: user };
  };

  read = async (token:string):
  Promise<ResponseUser<User[]> | ResponseError> => {
    const jwtToken = this.jwt.validate(token); 
    if ('status' in jwtToken) return jwtToken;

    const userToken = await this.model.readOne({ _id: jwtToken.id }) as UserId;
    if (!userToken) {
      return {
        status: this.status.UNAUTHORIZED,
        response: { error: this.errors.UNAUTHORIZED },
      };
    }
    const user = await this.model.read() as UserId[];
    return { status: this.status.OK, response: user };
  };
}

export default UserService;