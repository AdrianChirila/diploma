import { createContext, Context } from "react";
import { UserType } from "../types";

export interface IAuthContext {
  token: null | string;
  login: (token: string, userType: UserType) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userType: UserType | null;
}

const defaultValue: IAuthContext = {
  token: null,
  userType: null,
  login: () => undefined,
  logout: () => undefined,
  isAuthenticated: false,
};

export const AuthContext: Context<IAuthContext> = createContext(defaultValue);
