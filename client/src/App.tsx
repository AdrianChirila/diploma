import { useEffect } from "react";
import { useRoutes, Props } from "./routes";
import { Routes, BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks";
import { AuthContext } from "./context/Auth";
import { Navbar } from "./pages/Navbar";
import "materialize-css";

export const App = () => {
  const { token, userType, login, logout } = useAuth();
  const isAuthenticated = !!token;

  useEffect(() => {
    M.AutoInit();
  });

  const data: Props = token && userType ? { userType, isAuthenticated: true } : { isAuthenticated: false };

  const routes = useRoutes(data);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userType, login, logout }}>
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className="container">
          <Routes>{routes}</Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
