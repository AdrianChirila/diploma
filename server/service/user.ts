import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions, FlattenMaps, LeanDocument } from "mongoose";
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

export const validatePassword = async ({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}): Promise<false | Omit<UserDocument, "password"> | LeanDocument<Omit<UserDocument, "password">>> => {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return omit(user.toJSON(), "password") as
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>;
};

export const getUsers = async (): Promise<
  (UserDocument & {
    _id: UserDocument["_id"];
  })[]
> => User.find();

export const findUser = async (query: FilterQuery<UserDocument>) => User.findOne(query).lean();

export const editUser = (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) =>
  User.findOneAndUpdate(query, update, options);

export const deleteUser = (query: FilterQuery<UserDocument>) => User.deleteOne(query);
