import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  const auth = useAuth();

  if (auth?.loading) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  if (!auth?.user || !auth.user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
