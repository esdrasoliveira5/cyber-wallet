import { Email } from '../types';

export interface Model<T> {
  create(obj: T): Promise<T>,

  readOne(obj: T | Email): Promise<T | null>
}