import { Email, ID } from '../types';
import { Transaction } from '../types/TransactionType';

export interface Model<T> {
  create(obj: T): Promise<T>

  readOne(obj: T | Email | ID): Promise<T | null>
  
  read(): Promise<T[]>

  update(id: string, obj: T): Promise<T | null>

  transaction(id: string, obj: Transaction): Promise<T | null>

}