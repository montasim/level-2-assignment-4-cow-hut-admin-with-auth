import { Model, Types } from 'mongoose';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ICowLocationConstant;
  breed: ICowBreadConstant;
  weight: number;
  label: ICowLabelConstant;
  category: ICowCategoryConstant;
  seller: Types.ObjectId;
};

export type ICowLocationConstant =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';
export type ICowBreadConstant =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

export type ICowLabelConstant = 'for sale' | 'sold out';
export type ICowCategoryConstant = 'Dairy' | 'Beef' | 'Dual Purpose';
export type ICowFilters = {
  searchTerm?: string;
};

export type ICowModel = Model<ICow, Record<string, unknown>>;
