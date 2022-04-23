import { Model as M, Document } from 'mongoose';
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

  transaction = async (id: string, obj: Transaction):
  Promise<T | null> =>
    this.model.findByIdAndUpdate(
      id, 
      { $push: { transactions: { $currentDate: { ...obj, date: true } } } }, 
      { new: true },
    );
}

export default MongoModel;