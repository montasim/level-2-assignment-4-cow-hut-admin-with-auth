"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        age: zod_1.z
            .number({
            required_error: 'Age is required',
        })
            .min(0),
        price: zod_1.z
            .number({
            required_error: 'Price is required',
        })
            .min(0),
        location: zod_1.z.enum([...cow_constant_1.cowLocationConstant], {
            required_error: 'Location is required',
        }),
        breed: zod_1.z.enum([...cow_constant_1.cowBreadConstant], {
            required_error: 'Cow breed is required',
        }),
        weight: zod_1.z
            .number({
            required_error: 'Weight is required',
        })
            .min(0),
        label: zod_1.z.enum([...cow_constant_1.cowLabelConstant], {
            required_error: 'Label is required',
        }),
        category: zod_1.z.enum([...cow_constant_1.cowCategoryConstant], {
            required_error: 'Category is required',
        }),
        seller: zod_1.z.string().optional(),
    }),
});
exports.CowValidation = {
    createCowZodValidation,
};
