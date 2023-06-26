import { model, Schema } from 'mongoose';
import { ICow, ICowModel } from './cow.interface';
import {
  cowBreadConstant,
  cowCategoryConstant,
  cowLabelConstant,
  cowLocationConstant,
} from './cow.constant';

const cowSchema = new Schema<ICow>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: cowLocationConstant, required: true },
    breed: { type: String, enum: cowBreadConstant, required: true },
    weight: { type: Number, required: true },
    label: { type: String, enum: cowLabelConstant, default: 'for sale' },
    category: { type: String, enum: cowCategoryConstant, required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Create and export the Mongoose model
export const Cow = model<ICow, ICowModel>('Cow', cowSchema);
