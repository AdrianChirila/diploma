import { Schema, model, Document } from "mongoose";
import { compare, genSalt, hashSync } from "bcrypt";
import { defaultConfig } from "../config";

export enum UserType {
  Student = "student",
  Admin = "admin",
}

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userType: UserType;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, default: () => UserType.Student },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  const user = this as UserDocument;
  // hash the pass only if it was modified
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await genSalt(defaultConfig.SALT_WORK_FACTOR);
  const hash = hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (p: string) {
  const { password } = this as UserDocument;

  return compare(p, password).catch((e: Error) => false);
};

export const User = model<UserDocument>("User", UserSchema);
