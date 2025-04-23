import { AuthContext } from "@/providers/AuthProvider";
import { Rol } from "@/services/auth/AuthServiceInterface";
import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

interface UserRouteProps {
  children: ReactNode;
}

const UserRoute: React.FC<UserRouteProps> = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) return <Navigate to="/" />;
  return children;
};

export default UserRoute;
