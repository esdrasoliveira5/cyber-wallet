import { z } from 'zod'; 
import { AddressSchema } from './AddressType';
import { UserBasicInfo } from './UserBasicInfoType';

const UserInfoSchema = z.object({
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }),
  address: AddressSchema,
});

export type UserInfo = UserBasicInfo & z.infer<typeof UserInfoSchema>;
export { UserInfoSchema };