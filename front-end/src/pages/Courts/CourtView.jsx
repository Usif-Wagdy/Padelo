import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { getCourtById } from "../../api/Courts";
import { reserve } from "../../api/Reservation";
import { useAuth } from "../../context/AuthContext";

export default function CourtView() {
  const { id } = useParams();
  const { auth } = useAuth();
  const user = auth?.user;

  const { data: court, isLoading } = useQuery({
    queryKey: ["court", id],
    queryFn: () => getCourtById(id),
  });

  const [day, setDay] = useState("Monday");
  const [slot, setSlot] = useState(null);

  const mutation = useMutation({
    mutationFn: reserve,
    onSuccess: () => {
      alert("Reservation successful!");
    },
    onError: (err) => {
      alert("Reservation failed: " + err.message);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600 dark:text-gray-400">Loading court...</p>
      </div>
    );
  }

  if (!court) {
    return <p className="text-center mt-10">Court not found.</p>;
  }

  // Get slots for selected day from API response
  const selectedDaySlots =
    court.schedule.find((s) => s.day === day)?.slots || [];

  // Map slot number to human-readable time (11AM = slot 1)
  const getSlotTime = (slotNumber) => {
    let hour = 11 + (slotNumber - 1); // 11AM start
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${suffix}`;
  };

  const handleReserve = () => {
    if (!user) {
      alert("You must be logged in to reserve a court.");
      return;
    }
    if (!slot) {
      alert("Please select a slot.");
      return;
    }

    mutation.mutate({
      user: user._id,
      court: court._id,
      day,
      slotNumber: slot,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Court Image */}
      <img
        src={court.image}
        alt={court.name}
        className="w-full h-72 object-cover rounded-2xl shadow"
      />

      {/* Court Details */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold dark:text-white">{court.name}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {court.location}, {court.place}
        </p>
        <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg mt-2">
          EGP {court.price} <span className="text-sm">/ hour</span>
        </p>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          {court.description || "No description available."}
        </p>
      </div>

      {/* Reservation Form */}
      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-900 rounded-2xl shadow">
        <h2 className="text-xl font-semibold dark:text-white mb-4">
          Reserve this court
        </h2>

        {/* Day selector */}
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
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {selectedDaySlots.map((s) => {
            const isReserved = s.reserved;
            const isSelected = slot === s.number;

            return (
              <button
                key={s._id}
                disabled={isReserved}
                onClick={() => setSlot(s.number)}
                className={`p-2 rounded-lg text-sm font-medium transition 
                  ${
                    isReserved
                      ? "bg-red-500 text-white cursor-not-allowed opacity-70"
                      : isSelected
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 hover:bg-emerald-200 dark:bg-gray-700 dark:hover:bg-emerald-700 dark:text-white"
                  }`}
              >
                {getSlotTime(s.number)}
              </button>
            );
          })}
        </div>

        {/* Reserve Button */}
        <button
          onClick={handleReserve}
          disabled={mutation.isPending}
          className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
        >
          {mutation.isPending ? "Reserving..." : "Reserve"}
        </button>
      </div>
    </div>
  );
}
