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
      const token = Cookies.get("authToken");
      const user = Cookies.get("userData");

      if (!token || !user) {
        setAuth(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const { user: freshUser } = await checkAuth();
        Cookies.set("userData", JSON.stringify(freshUser));
        setAuth({ token, user: freshUser });
      } catch (error) {
        console.error("Auth check failed:", error);
        Cookies.remove("authToken");
        Cookies.remove("userData");
        setAuth(null);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
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
    navigate("/");
    setTimeout(() => {
      setLoading(false);
      Cookies.remove("authToken");
      Cookies.remove("userData");
      setAuth(null);
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
