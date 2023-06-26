import {
  ICowBreadConstant,
  ICowCategoryConstant,
  ICowLabelConstant,
  ICowLocationConstant,
} from './cow.interface';

export const cowLocationConstant: ICowLocationConstant[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];
export const cowBreadConstant: ICowBreadConstant[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];
export const cowLabelConstant: ICowLabelConstant[] = ['for sale', 'sold out'];
export const cowCategoryConstant: ICowCategoryConstant[] = [
  'Dairy',
  'Beef',
  'Dual Purpose',
];

export const cowFilterableFields = [
  'name',
  'location',
  'breed',
  'label',
  'category',
  'minPrice',
  'maxPrice',
  'searchTerm',
];

export const cowSearchableFields = [
  'name',
  'location',
  'breed',
  'label',
  'category',
]