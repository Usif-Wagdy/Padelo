import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

export default function History() {
  const { user, token } = useOutletContext();

  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({}); // To store the ratings for each booking
  const [hoverRatings, setHoverRatings] = useState({}); // To store the hover ratings state
  const [isComplete, setIsComplete] = useState({}); // To track completion status

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        // Ensure user and user.id are defined before making the API request
        if (!user || !user.id || !token) {
          console.error("User or token missing!");
          return;
        }

        const res = await axios.get(
          `http://127.0.0.1:3000/api/reservations/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Save the fetched reservations into state
        setBookingHistory(res.data.reservations);

        // Initialize ratings and completion statuses
        const initialRatings = {};
        const initialCompleteStatus = {};

        res.data.reservations.forEach((booking) => {
          initialRatings[booking._id] = booking.rating || 0; // Set initial rating
          initialCompleteStatus[booking._id] = booking.status === "Completed"; // Set completion status
        });

        setRatings(initialRatings);
        setIsComplete(initialCompleteStatus);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, [user, token]); // Ensure user and token are dependencies
  const handleRatingChange = async (bookingId, value) => {
    // Only allow changing rating if the booking is completed
    if (!isComplete[bookingId]) {
      console.log("Booking not completed, can't save rating.");
      return;
    }

    try {
      // Update the local state for rating immediately
      setRatings((prev) => ({ ...prev, [bookingId]: value }));

      // Save the rating to the backend
      const res = await axios.patch(
        `http://127.0.0.1:3000/api/reservations/${bookingId}/review`,
        { rating: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // After successfully saving, update the UI with the response rating
      setRatings((prev) => ({
        ...prev,
        [bookingId]: res.data.updatedRating, // Assuming the backend returns the updated rating
      }));
    } catch (error) {
      console.error("Error saving rating:", error);
    }
  };

  const toggleCompleteStatus = async (bookingId) => {
    try {
      await axios.patch(
        `http://127.0.0.1:3000/api/reservations/${bookingId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsComplete((prev) => ({ ...prev, [bookingId]: true }));
    } catch (error) {
      console.error("Error marking reservation as complete:", error);
    }
  };

  const cancelReservation = async (bookingId) => {
    try {
      await axios.patch(
        `http://127.0.0.1:3000/api/reservations/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsComplete((prev) => ({ ...prev, [bookingId]: false }));
      setBookingHistory((prevHistory) =>
        prevHistory.filter((booking) => booking._id !== bookingId)
      ); // Optionally remove from UI after cancel
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading booking history...</p>
      </div>
    );

  return (
    <table className="history-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Court</th>
          <th>Status</th>
          <th>Rating</th>
          <th>Complete</th>
          <th>Cancel</th>
        </tr>
      </thead>
      <tbody>
        {bookingHistory.map((booking) => (
          <tr key={booking._id}>
            <td>{booking.court.schedule[0]?.day || "N/A"}</td>
            <td>
              {booking.court.schedule[0]?.slots?.find(
                (slot) => slot.number === booking.slotNumber
              )?.number || "N/A"}
            </td>
            <td>{booking.court.name}</td>
            <td>{booking.status || "Reserved"}</td>
            <td>
              <div className="rating">
                {[...Array(5)].map((_, index) => {
                  const value = index + 1;
                  return (
                    <FaStar
                      key={index}
                      size={20}
                      className="star"
                      color={
                        value <=
                        (hoverRatings[booking._id] || ratings[booking._id] || 0)
                          ? "#ffc107"
                          : "#e4e5e9"
                      }
                      onClick={() => {
                        // Only allow rating if the booking is completed
                        if (isComplete[booking._id]) {
                          handleRatingChange(booking._id, value);
                        }
                      }}
                      onMouseEnter={() =>
                        setHoverRatings((prev) => ({
                          ...prev,
                          [booking._id]: value,
                        }))
                      }
                      onMouseLeave={() =>
                        setHoverRatings((prev) => ({
                          ...prev,
                          [booking._id]: 0,
                        }))
                      }
                    />
                  );
                })}
              </div>
            </td>
            <td>
              {!isComplete[booking._id] ? (
                <button
                  onClick={() => toggleCompleteStatus(booking._id)}
                  className="complete-button"
                >
                  Mark as Complete
                </button>
              ) : (
                <span>Completed</span>
              )}
            </td>
            <td>
              <button
                onClick={() => cancelReservation(booking._id)}
                className="cancel-button"
                disabled={isComplete[booking._id]}
              >
                Cancel
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
