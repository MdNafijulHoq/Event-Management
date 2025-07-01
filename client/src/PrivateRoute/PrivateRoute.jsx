import React from "react";
import { Navigate } from "react-router";
import AuthStore from "../zustandStore/useAuthStore";

const PrivateRoute = ({ children }) => {
  const { AuthUser } = AuthStore();

  if (AuthUser) return children;
  return <Navigate to="/signin" />;
};

export default PrivateRoute;
