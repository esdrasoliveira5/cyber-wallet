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

  reciveTransaction = async (email: string, obj: Transaction):
  Promise<T | null> => {
    const response = this.model.findOneAndUpdate(
      { email }, 
      { 
        $inc: { balance: obj.amount },
        $push: { transactions: { ...obj, date: new Date() } },
      }, 
      { new: true },
    );
    return response;
  };

  sendTransaction = async (email: string, obj: Transaction):
  Promise<T | null> => {
    const response = this.model.findOneAndUpdate(
      { email },
      { 
        $inc: { balance: -obj.amount },
        $push: { transactions: { ...obj, date: new Date() } },
      }, 
      { new: true },
    );
    return response;
  };

  delete = async (id:string): Promise<T | null> =>
    this.model.findByIdAndDelete(id);
}

export default MongoModel;