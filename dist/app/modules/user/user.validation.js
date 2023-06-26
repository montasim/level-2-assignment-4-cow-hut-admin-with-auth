"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        role: zod_1.z.enum([...user_constant_1.userTypes], {
            required_error: 'Role is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        budget: zod_1.z.number().min(0).optional(),
        income: zod_1.z.number().min(0).optional(),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z
            .string({
            required_error: 'Phone number is required',
        })
            .optional(),
        role: zod_1.z
            .enum([...user_constant_1.userTypes], {
            required_error: 'Role is required',
        })
            .optional(),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z
                .string({
                required_error: 'First name is required',
            })
                .optional(),
            lastName: zod_1.z
                .string({
                required_error: 'Last name is required',
            })
                .optional(),
        })
            .optional(),
        address: zod_1.z
            .string({
            required_error: 'Address is required',
        })
            .optional(),
        budget: zod_1.z.number().min(0).optional(),
        income: zod_1.z.number().min(0).optional(),
    }),
});
//   .refine(data=>
//     (data.body.budget && data.body.income), {
//       message: "A user can not have both budget and income"
//   }
// )
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
