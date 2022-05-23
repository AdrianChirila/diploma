import { useCallback, useState, useEffect } from "react";
import { UserType } from "../types";

const userData = "userData";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);

  const login = useCallback((jwt: string, user: UserType) => {
    setToken(jwt);
    setUserType(user);

    localStorage.setItem(userData, JSON.stringify({ token: jwt, userType: user }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserType(null);

    localStorage.removeItem(userData);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem(userData);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.token && parsedData.userType) {
        login(parsedData.token, parsedData.userType);
      }
    }
  }, [login]);

  return {
    login,
    logout,
    token,
    userType,
  };
};
