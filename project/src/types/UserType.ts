import { z } from 'zod'; 
import { UserInfo } from './UserInfoType';
import { TransactionSchema } from './TransactionType';

const UserSchema = z.object({
  _id: z.string({
    required_error: '_id is required',
    invalid_type_error: '_id must be a string',
  }).min(3, { message: '_id must have 24 hexadecimal characters' }),
  transactions: z.array(TransactionSchema),
  balance: z.number({
    required_error: 'balance is required',
    invalid_type_error: 'balance must be a number',
  }).min(0, { message: 'balance must be greater than 0' }),
});

export type User = UserInfo & z.infer<typeof UserSchema>;
export { UserSchema };