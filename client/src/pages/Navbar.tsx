import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { UserType } from "../types";

export const Navbar = (): React.ReactElement => {
  const { logout, userType } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <nav>
      <div className="nav-wrapper grey darken-1" style={{ padding: "0 2rem" }}>
        <span className="brand-logo">E-Learning Platform</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/posts">Go to Posts List </Link>
          </li>
          {userType === UserType.Admin && (
            <li>
              <Link to="/posts/create">Go to Create Post </Link>
            </li>
          )}
          <li>
            <Link to="/playground">Playground </Link>
          </li>
          <li>
            <a onClick={logoutHandler}>Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
