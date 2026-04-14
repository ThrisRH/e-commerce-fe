import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const Middleware = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (roles.length && !roles.some((r) => user.roles.includes(r))) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default Middleware;
