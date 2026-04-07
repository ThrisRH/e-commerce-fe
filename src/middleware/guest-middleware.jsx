import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const GuestMiddleware = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (user) {
    // If user is already logged in, redirect to home page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestMiddleware;
