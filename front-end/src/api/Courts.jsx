import { Axios } from "./Axios";

export const allCourts = async () => {
  const { data } = await Axios.get("/api/courts");
  return data;
}; //Done

export const getCourtById = async (courtId) => {
  const { data } = await Axios.get(`/api/courts/${courtId}`);
  return data.court;
}; //Done

export const getReviewsById = async (courtId) => {
  const { data } = await Axios.get(`/api/courts/${courtId}/reviews`);
  return data.reviews;
}; //Done

export const deleteCourt = async (courtId) => {
  const { data } = await Axios.delete(`/admin/courts/${courtId}`);
  return data;
}; //Done

export const updateCourt = async (courtId, formData) => {
  const { data } = await Axios.patch(`/admin/courts/${courtId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data; //Done
};

export const addCourt = async (courtData) => {
  const { data } = await Axios.post(`/admin/courts`, courtData);
  return data;
}; //Done
