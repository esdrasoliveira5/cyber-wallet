import { Schema, model as createModel, Document } from 'mongoose';
import { User } from '../types/UserType';
import MongoModel from './MongoModel';

interface UserDocument extends Omit<User, '_id'>, Document {}

const userSchema = new Schema<UserDocument>(
  {
    name: String,
    lastName: String,
    email: String,
    contact: String,
    password: String,
    address: Object,
    balance: Number,
    transactions: Object,
  },
  { versionKey: false },
);

class UserModel extends MongoModel<Omit<User, '_id'>> {
  constructor(model = createModel('user', userSchema)) {
    super(model);
  }
}

export default UserModel;
