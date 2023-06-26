import { Cow } from './cow.model';
import { ICow, ICowFilters } from './cow.interface';
import config from '../../../config';
import ApiError from '../../../erros/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import {cowFilterableFields, cowSearchableFields} from './cow.constant';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const newCow = await Cow.create(cow);
  if (!newCow) {
    throw new Error('Failed to create user!');
  }
  return newCow;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
};

const getCow = async (id: string | undefined): Promise<ICow | null> => {
  const cow = await Cow.findById(id);
  return cow;
};

const updateCowData = async (
  id: string,
  userData: ICow
): Promise<ICow | null> => {
  const updatedCowData = await Cow.findOneAndUpdate({ _id: id }, userData, {
    new: true,
  });
  ////TODO: cow not found
  return updatedCowData;
};

const deleteCow = async (id: string) => {
  const result = await Cow.findByIdAndDelete(id);
  ////TODO: cow now found
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getCow,
  updateCowData,
  deleteCow,
};
