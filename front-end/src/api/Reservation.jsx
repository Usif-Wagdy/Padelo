import { Axios } from "./Axios";

export const reserve = async (details) => {
  const { data } = await Axios.post(`/api/reservations`, details);
  return data;
}; // done

export const completeReservation = async (details, reservationId) => {
  const { data } = await Axios.patch(
    `/api/reservations/${reservationId}/complete`,
    details
  );
  return data;
};

export const cancelReservation = async (details, reservationId) => {
  const { data } = await Axios.patch(
    `/api/reservations/${reservationId}/cancel`,
    details
  );
  return data;
};

export const reviewReservation = async (details, reservationId) => {
  const { data } = await Axios.patch(
    `/api/reservations/${reservationId}/review`,
    details
  );
  return data;
};

export const reviewCourt = async (userDetails, courtId) => {
  const { data } = await Axios.post(
    `/api/courts/${courtId}/reviews`,
    userDetails
  );
  return data;
};

// api/Reservation.js
export const history = async (userId, page = 1, limit = 4) => {
  const { data } = await Axios.get(
    `/api/reservations/user/${userId}?page=${page}&limit=${limit}`
  );
  return data;
};
