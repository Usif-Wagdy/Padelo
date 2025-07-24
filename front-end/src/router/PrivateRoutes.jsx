import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, type }) {
  const { auth } = useAuth();

  const user = auth?.user;

  const isAuthenticated = !!user;
  const isAdmin = user?.role == "admin" || false;

  if (type === "requireAuth" && !isAuthenticated) {
    return <Navigate to="/Oops" />;
  }

  if (type === "requireNoAuth" && isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (type === "admin" && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}
