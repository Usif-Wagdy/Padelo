import { createContext, useContext, useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { useUI } from "../context/UIContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setLoading } = useUI();
  const navigate = useNavigate();

  const [auth, setAuth] = useState(() => {
    const token = Cookies.get("authToken");
    const user = Cookies.get("userData");
    return token && user ? { token, user: JSON.parse(user) } : null;
  });

  // Sync auth from cookies on refresh
  useEffect(() => {
    const token = Cookies.get("authToken");
    const user = Cookies.get("userData");

    if (token && user) {
      setAuth({ token, user: JSON.parse(user) });
    } else {
      setAuth(null);
    }
  }, []);

  const login = (token, user) => {
    setTimeout(() => {
      Cookies.set("authToken", token);
      Cookies.set("userData", JSON.stringify(user));
      setAuth({ token, user });
      navigate("/");
      setLoading(false);
      toast.success("Logged in successfully!");
    }, 1500);
  };

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      Cookies.remove("authToken");
      Cookies.remove("userData");
      setAuth(null);
      navigate("/login");
      setLoading(false);
      toast.success("Logged out successfully!");
    }, 1500);
  };

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated: !!auth,
      login,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
