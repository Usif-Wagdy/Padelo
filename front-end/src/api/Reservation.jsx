import { Axios } from "./Axios";

export const reserve = async (details) => {
  const { data } = await Axios.post(`/api/reservations`, details);
  return data;
};
