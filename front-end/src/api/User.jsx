import { Axios } from "./Axios";

export const register = async (userData) => {
  const { data } = await Axios.post("/api/users/register", userData);
  return data;
}; //Done

export const login = async (userData) => {
  const { data } = await Axios.post("/api/users/login", userData);
  return data;
}; //Done

export const checkAuth = async () => {
  const { data } = await Axios.post("/api/users/checkAuth");
  return data;
}; //Done

export const verifyEmail = async (userData) => {
  const { data } = await Axios.post("/api/users/verify_email", userData);
  return data;
}; //Done

export const resendVerificationCode = async (userData) => {
  const { data } = await Axios.post("/api/users/resend_verification", userData);
  return data;
}; //Done

export const updateUser = async (userData) => {
  const { data } = await Axios.patch("/api/users/updateUser", userData);
  return data;
};

export const updateUserImage = async (userId, image) => {
  const form_Data = new FormData();
  form_Data.append("photo", image);
  const { data } = await Axios.patch(
    `/api/users/update-image/${userId}`,
    form_Data
  );
  return data;
};
