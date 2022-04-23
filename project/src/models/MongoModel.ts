import { Model as M, Document } from 'mongoose';
import { date } from 'zod';
import { Model } from '../interfaces/ModelInterface';
import { Email, ID } from '../types';
import { Transaction } from '../types/TransactionType';
import { UserInfo } from '../types/UserInfoType';

abstract class MongoModel<T> implements Model<T> {
  constructor(public model: M<T & Document>) {}

  create = async (obj: T): Promise<T> => this.model.create(obj);

  readOne = async (obj: T | Email | ID):
  Promise<T | null> => this.model.findOne(obj);

  read = async (): Promise<T[]> => this.model.find();

  update = async (id: string, obj: T | Omit<UserInfo, 'email'>):
  Promise<T | null> =>
    this.model.findByIdAndUpdate(id, { ...obj }, { new: true });

  reciveTransaction = async (id: string, obj: Transaction):
  Promise<T | null> => {
    const response = this.model.findByIdAndUpdate(
      id, 
      { 
        $inc: { balance: obj.amount },
        $push: { transactions: { ...obj, date: new Date() } },
      }, 
      { new: true },
    );
    return response;
  };

  sendTransaction = async (id: string, obj: Transaction):
  Promise<T | null> => {
    const response = this.model.findByIdAndUpdate(
      id, 
      { 
        $inc: { balance: -obj.amount },
        $push: { transactions: { ...obj, date: new Date() } },
      }, 
      { new: true },
    );
    return response;
  };
}

export default MongoModel;