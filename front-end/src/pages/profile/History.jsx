import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import {
  history,
  cancelReservation,
  completeReservation,
  reviewReservation,
  reviewCourt,
} from "../../api/Reservation";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

export default function History() {
  const { auth } = useAuth();
  const user = auth?.user;
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const limit = 4 ; // reservations per page

  // === Fetch reservations (with pagination) ===
  const { data, isLoading } = useQuery({
    queryKey: ["reservations", user?._id, page],
    queryFn: () => history(user._id, page, limit),
    enabled: !!user,
    keepPreviousData: true,
  });

  const reservations = data?.reservations || [];
  const totalPages = data?.totalPages || 1;

  // === Mutations ===
  const cancelMutation = useMutation({
    mutationFn: ({ reservationId, details }) =>
      cancelReservation(details, reservationId),
    onSuccess: () => {
      toast.success("Reservation canceled");
      queryClient.invalidateQueries(["reservations", user._id, page]);
    },
    onError: () => toast.error("Failed to cancel reservation"),
  });

  const completeMutation = useMutation({
    mutationFn: ({ reservationId, details }) =>
      completeReservation(details, reservationId),
    onSuccess: () => {
      toast.success("Reservation marked complete");
      queryClient.invalidateQueries(["reservations", user._id, page]);
    },
    onError: () => toast.error("Failed to complete reservation"),
  });

  const reviewReservationMutation = useMutation({
    mutationFn: ({ reservationId, details }) =>
      reviewReservation(details, reservationId),
    onSuccess: () => {
      toast.success("Reservation review submitted 🎉");
      queryClient.invalidateQueries(["reservations", user._id, page]);
    },
    onError: () => toast.error("Failed to submit reservation review"),
  });

  const reviewCourtMutation = useMutation({
    mutationFn: ({ courtId, details }) => reviewCourt(details, courtId),
    onSuccess: () => {
      toast.success("Court review submitted 🏟️");
      queryClient.invalidateQueries(["reservations", user._id, page]);
    },
    onError: () => toast.error("Failed to submit court review"),
  });

  // === Review Modal State ===
  const [reviewing, setReviewing] = useState(null); // { type: "reservation"|"court", id: string }
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // === Slot → Time Mapping (8 AM – 11 PM, 16 slots) ===
  const getSlotTime = (slotNumber) => {
    const startHour = 8; // 8:00 AM
    const hour = startHour + (slotNumber - 1);
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:00 ${suffix}`;
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading reservations...</p>;
  }

  if (!reservations || reservations.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
        You don’t have any reservations yet.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold dark:text-white mb-6">
        Reservation History
      </h1>

      {reservations.map((res) => (
        <div
          key={res._id}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          {/* Court Info */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {res.court?.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {res.day} at {getSlotTime(res.slotNumber)}
            </p>
            <p className="text-sm text-gray-500">Status: {res.status}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            {res.status === "reserved" && (
              <>
                <button
                  onClick={() =>
                    cancelMutation.mutate({
                      reservationId: res._id,
                      details: { user: user._id, court: res.court._id },
                    })
                  }
                  disabled={cancelMutation.isPending}
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
                >
                  {cancelMutation.isPending ? "Canceling..." : "Cancel"}
                </button>

                <button
                  onClick={() =>
                    completeMutation.mutate({
                      reservationId: res._id,
                      details: { user: user._id, court: res.court._id },
                    })
                  }
                  disabled={completeMutation.isPending}
                  className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
                >
                  {completeMutation.isPending
                    ? "Completing..."
                    : "Mark Complete"}
                </button>
              </>
            )}

            {res.status === "completed" && (
              <>
                <button
                  onClick={() =>
                    setReviewing({ type: "reservation", id: res._id })
                  }
                  className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
                >
                  Review Reservation
                </button>
                <button
                  onClick={() =>
                    setReviewing({ type: "court", id: res.court._id })
                  }
                  className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm"
                >
                  Review Court
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {reviewing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-md w-full space-y-4">
            <h2 className="text-xl font-semibold dark:text-white">
              {reviewing.type === "reservation"
                ? "Review Reservation"
                : "Review Court"}
            </h2>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${
                    rating >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Write your feedback..."
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setReviewing(null)}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (reviewing.type === "reservation") {
                    reviewReservationMutation.mutate({
                      reservationId: reviewing.id,
                      details: { user: user._id, rating, comment },
                    });
                  } else if (reviewing.type === "court") {
                    reviewCourtMutation.mutate({
                      courtId: reviewing.id,
                      details: { user: user._id, rating, comment },
                    });
                  }
                  setReviewing(null);
                  setRating(0);
                  setComment("");
                }}
                className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
