import { Login } from '../types';

export interface Model<T> {
  create(obj: T): Promise<T>,

  readOne(obj: T | Login): Promise<T | null>
}