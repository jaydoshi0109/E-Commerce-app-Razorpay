import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedUserRoute: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  const auth = useAuth();

  if (auth?.loading) return <div className="text-center p-4">Loading...</div>;

  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedUserRoute;
