import { Response } from 'express';
import Controller from '.';
import {
  RequestWithBody,
} from '../interfaces/RequestsInterfaces';
import { Error, Token } from '../interfaces/ResponsesInterface';
import UserService from '../services/UserService';
import { Login } from '../types';
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

  login = async (
    req: RequestWithBody<Login>,
    res: Response<Token<User> | Error>,
  ): Promise<typeof res> => {
    const { body } = req;
    
    const { status, response } = await this.service.login(body);

    return res.status(status).json(response as Token<User>);
  };
}

export default UserController;