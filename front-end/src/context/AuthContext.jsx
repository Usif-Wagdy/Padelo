import { createContext, useContext, useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { useUI } from "../context/UIContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkAuth } from "../api/User";

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
    const verifyAuth = async () => {
      setLoading(true);
      const token = Cookies.get("authToken");
      const user = Cookies.get("userData");
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      if (!token || !user) return setAuth(null);
      try {
        const { user } = await checkAuth();
        Cookies.set("userData", JSON.stringify(user));
        setAuth({ token, user });
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Auth check failed:", error);
        Cookies.remove("authToken");
        Cookies.remove("userData");
        setAuth(null);
      }
    };

    verifyAuth();
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

  // Update auth to reflect only changes to specific parts of the state
  const setAuthState = (newState) => {
    setAuth((prevState) => ({
      ...prevState, // Retain previous state
      user: { ...prevState.user, ...newState.user }, // Update only the user object
      token: newState.token ?? prevState.token, // Optionally update the token
    }));
  };

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated: !!auth,
      login,
      logout,
      setAuth,
      setAuthState,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
