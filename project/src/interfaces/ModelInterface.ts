import { Email, ID } from '../types';

export interface Model<T> {
  create(obj: T): Promise<T>,

  readOne(obj: T | Email | ID): Promise<T | null>
  
  read(): Promise<T[]>,
}