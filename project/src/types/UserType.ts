import { z } from 'zod'; 
import { UserInfo } from './UserInfoType';
import { TransactionSchema } from './TransactionType';

const UserSchema = z.object({
  transactions: z.array(TransactionSchema),
  balance: z.number({
    required_error: 'balance is required',
    invalid_type_error: 'balance must be a number',
  }).min(0, { message: 'balance must be greater than 0' }),
});

export type User = UserInfo & z.infer<typeof UserSchema>;
export { UserSchema };