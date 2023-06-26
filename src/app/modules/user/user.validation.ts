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
})
//   .superRefine((val, ctx) => {
//       if(val.body.budget >= 0 && val.body.income >= 0) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "An user can not have both budget and income together."
//         });
//       }
//
//       if(val.body.role === 'seller' && val.body.budget >= 0) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "A seller can have income, not a budget"
//         });
//       }
//
//       if(val.body.role === 'buyer' && val.body.income >= 0) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "A buyer can have budget, not a income"
//         });
//       }
//     }
// )

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
  })})
  // .superRefine((val, ctx): arg is { first: string; second: number } => {
//   .superRefine((val, ctx) => {
//     if(val.body.budget > 0 && val.body.income > 0) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "An user can not have both budget and income together."
//       });
//     }
//
//     if(val.body.role === 'seller' > 0 && val.body.budget > 0) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "An seller can have income not budget"
//       });
//     }
//
//     if(val.body.role === 'buyer' > 0 && val.body.income > 0) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "An buyer can have budget not income"
//       });
//     }
//   }
// )

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
