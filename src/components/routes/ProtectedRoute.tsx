import React, { ReactNode, useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const { user } = useContext(AuthContext)
  console.log(user)
  if (!user) {
    return <Navigate to="/login" replace/>
  }

  return children
}

export default ProtectedRoute