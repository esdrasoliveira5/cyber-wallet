import { z } from 'zod'; 
import { User } from './UserType';

const UserIdSchema = z.object({
  _id: z.string({
    required_error: '_id is required',
    invalid_type_error: '_id must be a string',
  }).length(24, { message: '_id must have 24 hexadecimal characters' }),
});

export type UserId = User & z.infer<typeof UserIdSchema>;
export { UserIdSchema };