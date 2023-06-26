import { z } from 'zod';
import {
  cowBreadConstant,
  cowCategoryConstant,
  cowLabelConstant,
  cowLocationConstant,
} from './cow.constant';

const createCowZodValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z
      .number({
        required_error: 'Age is required',
      })
      .min(0),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .min(0),
    location: z.enum([...cowLocationConstant] as [string, ...string[]], {
      required_error: 'Location is required',
    }),
    breed: z.enum([...cowBreadConstant] as [string, ...string[]], {
      required_error: 'Cow breed is required',
    }),
    weight: z
      .number({
        required_error: 'Weight is required',
      })
      .min(0),
    label: z.enum([...cowLabelConstant] as [string, ...string[]], {
      required_error: 'Label is required',
    }),
    category: z.enum([...cowCategoryConstant] as [string, ...string[]], {
      required_error: 'Category is required',
    }),
    seller: z.string().optional(),
  }),
});

export const CowValidation = {
  createCowZodValidation,
};
