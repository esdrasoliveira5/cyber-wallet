import { z } from 'zod'; 

const AddressSchema = z.object({
  street: z.string({
    required_error: 'street is required',
    invalid_type_error: 'street must be a string',
  }).min(3, { message: 'street must be 3 or more characters long' }),
  number: z.string({
    required_error: 'number is required',
    invalid_type_error: 'number must be a string',
  }),
  district: z.string({
    required_error: 'district is required',
    invalid_type_error: 'district must be a string',
  }).min(3, { message: 'district must be 3 or more characters long' }),
  zipcode: z.string({
    required_error: 'zipcode is required',
    invalid_type_error: 'zipcode must be a number',
  }).length(9, { message: 'zipcode must be 9 characters long' }),
  city: z.string({
    required_error: 'city is required',
    invalid_type_error: 'city must be a string',
  }).min(3, { message: 'city must be 3 or more characters long' }),
  state: z.string({
    required_error: 'state is required',
    invalid_type_error: 'state must be a string',
  }).min(2, { message: 'state must be 3 or more characters long' }),
  country: z.string({
    required_error: 'contry is required',
    invalid_type_error: 'contry must be a string',
  }).min(2, { message: 'contry must be 3 or more characters long' }),
});

export type Address = z.infer<typeof AddressSchema>;
export { AddressSchema };