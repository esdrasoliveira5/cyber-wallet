import Service from '.';
import {
  ResponseError,
  ResponseLogin,
  ResponseUser,
} from '../interfaces/ResponsesInterface';
import UserModel from '../models/UserModel';
import { Login } from '../types';
import { Transaction } from '../types/TransactionType';
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
    if (user) return this.response.CONFLICT;

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
    if (!user) return this.response.NOT_FOUND;
    
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
    if (!userToken) return this.response.UNAUTHORIZED;

    const user = await this.model.readOne({ _id: id });
    if (!user) return this.response.NOT_FOUND;

    return { status: this.status.OK, response: user as UserId };
  };

  read = async (token: string):
  Promise<ResponseUser<User[]> | ResponseError> => {
    const jwtToken = this.jwt.validate(token); 
    if ('status' in jwtToken) return jwtToken;

    const userToken = await this.model.readOne({ _id: jwtToken.id }) as UserId;
    if (!userToken) return this.response.UNAUTHORIZED;

    const user = await this.model.read();
    return { status: this.status.OK, response: user as UserId[] };
  };

  update = async (token: string, id: string, obj: UserInfo):
  Promise<ResponseUser<User> | ResponseError> => {
    const validation = this.validations.userUpdate(id, obj);
    if (validation) return validation;

    const jwtToken = this.jwt.validate(token);
    if ('status' in jwtToken) return jwtToken;

    const userToken = await this.model.readOne({ _id: jwtToken.id }) as UserId;
    if (!userToken) return this.response.UNAUTHORIZED;

    const hash = await this.bcrypt.hashIt(obj.password);
    const user = await this.model.update(id, { ...obj, password: hash });
    if (!user) return this.response.NOT_FOUND;

    return { status: this.status.OK, response: user as UserId };
  };

  transaction = async (token: string | undefined, obj: Transaction): 
  Promise<ResponseError | ResponseUser<User>> => {
    const validation = this.validations.transaction(obj);
    if (validation) return validation;

    const jwtToken = this.jwt.validate(token);
    if ('status' in jwtToken) return jwtToken;

    const reciver = await this.model.readOne(
      { email: obj.receiver.email },
    ) as UserId;
    if (!reciver) return this.response.NOT_FOUND;

    const response = await this.model.sendTransaction(jwtToken.id, obj);
    if (response === null) return this.response.NOT_FOUND;

    await this.model.reciveTransaction(reciver._id, obj);

    return { status: this.status.OK, response: response as UserId };
  };
}

export default UserService;