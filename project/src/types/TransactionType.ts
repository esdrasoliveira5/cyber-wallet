import { z } from 'zod'; 
import { UserBasicInfoSchema } from './UserBasicInfoType';

const TransactionSchema = z.object({
  type: z.string().and(z.literal('payment')
    .or(z.literal('transfer'))
    .or(z.literal('deposit'))),
  receiver: UserBasicInfoSchema,
  transmitter: UserBasicInfoSchema,
  amount: z.number({
    required_error: 'amount is required',
    invalid_type_error: 'amount must be a number',
  }).min(0, { message: 'amount must be greater than 0' }),
  date: z.string().optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
export { TransactionSchema };