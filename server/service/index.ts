import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import { User, UserDocument } from "../model";

export const createUser = async (
  data: DocumentDefinition<UserDocument>,
): Promise<
  UserDocument & {
    _id: any;
  }
> => {
  try {
    return await User.create(data);
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

export const getUsers = async () => User.find();

export const findUser = async (query: FilterQuery<UserDocument>) => User.findOne(query).lean();

export const editUser = (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) =>
  User.findOneAndUpdate(query, update, options);

export const deleteUser = (query: FilterQuery<UserDocument>) => User.deleteOne(query);
