import { Request, Response } from 'express';
import Controller from '.';
import {
  RequestWithBody,
} from '../interfaces/RequestsInterfaces';
import UserService from '../services/UserService';
import { Login } from '../types';
import { Transaction } from '../types/TransactionType';
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
    res: Response,
  ): Promise<typeof res> => {
    const { body } = req;
    
    const { status, response } = await this.service.create(body);

    return res.status(status).json(response);
  };

  login = async (
    req: RequestWithBody<Login>,
    res: Response,
  ): Promise<typeof res> => {
    const { body } = req;
    
    const { status, response } = await this.service.login(body);

    return res.status(status).json(response);
  };

  readOne = async (req: Request, res: Response): Promise<typeof res> => {
    const { id } = req.params;
    const { authorization } = req.headers;
    
    const { status, response } = await this.service.readOne(authorization, id);

    return res.status(status).json(response);
  };

  read = async (req: Request, res: Response): Promise<typeof res> => {
    const { authorization } = req.headers;
    
    const { status, response } = await this.service.read(authorization);

    return res.status(status).json(response);
  };

  update = async (req: RequestWithBody<UserInfo>, res: Response):
  Promise<typeof res> => {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { body } = req;

    const {
      status,
      response,
    } = await this.service.update(authorization, id, body);
    
    return res.status(status).json(response);
  };

  transaction = async (req: RequestWithBody<Transaction>, res: Response):
  Promise<typeof res> => {
    const { authorization } = req.headers;
    const { body } = req;

    const {
      status,
      response,
    } = await this.service.transaction(authorization, body);
    
    return res.status(status).json(response);
  };
}

export default UserController;