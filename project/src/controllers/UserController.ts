import { Response } from 'express';
import Controller from '.';
import {
  RequestWithBody,
} from '../interfaces/RequestsInterfaces';
import { Error } from '../interfaces/ResponsesInterface';
import UserService from '../services/UserService';
import { UserInfo } from '../types/UserInfoType';
import { User } from '../types/UserType';

class UserController extends Controller<User | UserInfo> {
  private _route: string;

  constructor(
    service = new UserService(),
    route = '/user',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<UserInfo>,
    res: Response<User | Error>,
  ): Promise<typeof res> => {
    const { body } = req;
    
    const { status, response } = await this.service.create(body);

    return res.status(status).json(response as User);
  };
}

export default UserController;