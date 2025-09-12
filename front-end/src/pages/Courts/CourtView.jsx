import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getCourtById, getReviewsById } from "../../api/Courts";
import { reserve } from "../../api/Reservation";
import { useAuth } from "../../context/AuthContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CourtView() {
  const { id } = useParams();
  const { auth } = useAuth();
  const user = auth?.user;
  const queryClient = useQueryClient();

  // Court details
  const { data: court, isLoading: isCourtLoading } = useQuery({
    queryKey: ["court", id],
    queryFn: () => getCourtById(id),
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Reviews for this court
  const { data: reviews, isLoading: isReviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviewsById(id),
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const [day, setDay] = useState("Monday");
  const [slot, setSlot] = useState(null);

  const mutation = useMutation({
    mutationFn: reserve,
    onSuccess: () => {
      toast.success("Reservation successful 🎾");
      queryClient.invalidateQueries(["court", id]);
    },
    onError: (err) => {
      toast.error("Reservation failed: " + err.message);
    },
  });

  if (isCourtLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600 dark:text-gray-400">Loading court...</p>
      </div>
    );
  }

  if (!court) {
    return <p className="text-center mt-10">Court not found.</p>;
  }

  // Slots for the selected day
  const selectedDaySlots =
    court.schedule.find((s) => s.day === day)?.slots || [];

  const getSlotTime = (slotNumber) => {
    // 16 slots: slot 1 = 8:00 AM, slot 16 = 11:00 PM
    const startHour = 8;
    const hour = startHour + (slotNumber - 1);
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:00 ${suffix}`;
  };

  const handleReserve = () => {
    if (!user) {
      toast.error("You must be logged in to reserve a court.");
      return;
    }
    if (!slot) {
      toast.error("Please select a slot.");
      return;
    }

    mutation.mutate({
      user: user._id,
      court: court._id,
      day,
      slotNumber: slot,
    });
  };

  const renderStars = (rating) => {
    const numericRating = Number(rating) || 0;
    const stars = [];
    const fullStars = Math.floor(numericRating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      {/* Court Image */}
      <div className="rounded-2xl overflow-hidden shadow border border-gray-200 dark:border-gray-700">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-80 object-cover"
        />
      </div>

      {/* Court Details */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {court.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {court.location}, {court.place}
            </p>
          </div>
          <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-xl">
            EGP {court.price} <span className="text-sm">/ hour</span>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300">
          {court.description || "No description available."}
        </p>

        {/* Rating summary */}
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {renderStars(court.averageRating)}
          </div>
          <span className="text-gray-700 dark:text-gray-300">
            {court.averageRating?.toFixed(1)} / 5
          </span>
          <span className="text-gray-500 text-sm">
            ({reviews?.length || 0} reviews)
          </span>
        </div>
      </div>

      {/* Reservation Form */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Reserve this court
        </h2>

        {/* Day selector */}
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">
          Select a day:
        </label>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="mb-4 p-2 rounded border dark:bg-gray-800 dark:text-white"
        >
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Slots grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {selectedDaySlots.map((s) => {
            const isReserved = s.reserved;
            const isSelected = slot === s.number;
            return (
              <div
                key={s._id}
                onClick={() => !isReserved && setSlot(s.number)}
                className={`p-3 text-center rounded-lg cursor-pointer transition 
                  ${
                    isReserved
                      ? "bg-red-100 text-red-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-emerald-100 dark:bg-gray-700 dark:hover:bg-emerald-700 dark:text-white"
                  }`}
              >
                {getSlotTime(s.number)}
              </div>
            );
          })}
        </div>

        <button
          onClick={handleReserve}
          disabled={mutation.isPending}
          className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
        >
          {mutation.isPending ? "Reserving..." : "Reserve"}
        </button>
      </div>

      {/* Reviews Section */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Reviews
        </h2>

        {isReviewsLoading ? (
          <p className="text-gray-600 dark:text-gray-400">Loading reviews...</p>
        ) : reviews?.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
              >
                <div className="flex items-center gap-3 mb-1">
                  <img
                    src={review.user?.image || "/default-avatar.png"}
                    alt={review.user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {review.user?.name || "Anonymous"}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      {renderStars(review.rating)}
                      <span className="ml-2">{review.rating}/5</span>
                    </div>
                    {/* Date & time */}
                    <p className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 ml-13 break-words whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
