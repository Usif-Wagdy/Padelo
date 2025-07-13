import { Axios } from "./Axios";

export const allCourts = async () => {
  const { data } = await Axios.get("/api/courts");
  return data;
}; //Done
