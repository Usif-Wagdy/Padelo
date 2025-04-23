import { Axios } from "./Axios";

export const register = async (userData) => {
  const { data } = await Axios.post("/api/users/register", userData);
  return data; //done
};

export const login = async (userData) => {
  const { data } = await Axios.post("/api/users/login", userData);
  return data; //done
};

export const checkAuth = async (userData) => {
  const { data } = await Axios.post("/api/users/check_auth", userData);
  return data;
};

export const verifyEmail = async (userData) => {
  const { data } = await Axios.post("/api/users/verify_email", userData);
  return data;
};

export const resendVerificationCode = async (userData) => {
  const { data } = await Axios.post("/api/users/resend_verification", userData);
  return data;
};
