import { z } from 'zod'; 

const UserBasicInfoSchema = z.object({
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a string',
  }).min(3, { message: 'name must be 3 or more characters long' }),
  lastName: z.string({
    required_error: 'lastName is required',
    invalid_type_error: 'lastName must be a string',
  }).min(3, { message: 'lastName must be 3 or more characters long' }),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string',
  }).email({ message: 'email invalid' }),
  contact: z.string({
    required_error: 'contact is required',
    invalid_type_error: 'contact must be a string',
  }).min(14, { message: 'contact must be min 14 characters long' }),
});

export type UserBasicInfo = z.infer<typeof UserBasicInfoSchema>;
export { UserBasicInfoSchema };