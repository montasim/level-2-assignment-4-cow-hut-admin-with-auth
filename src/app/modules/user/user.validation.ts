import { z } from 'zod';
import { userTypes } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    role: z.enum([...userTypes] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    budget: z.number().min(0).optional(),
    income: z.number().min(0).optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z
      .string({
        required_error: 'Phone number is required',
      })
      .optional(),
    role: z
      .enum([...userTypes] as [string, ...string[]], {
        required_error: 'Role is required',
      })
      .optional(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .optional(),
    budget: z.number().min(0).optional(),
    income: z.number().min(0).optional(),
  }),
});
//   .refine(data=>
//     (data.body.budget && data.body.income), {
//       message: "A user can not have both budget and income"
//   }
// )

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
