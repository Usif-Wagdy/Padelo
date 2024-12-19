import React, { useState, useEffect } from "react";
import "../Styles/ReservationPage.css";
import { useParams } from "react-router-dom";
import Header from "../Components/Header/Header";

const PadelBooking = () => {
  const court1 = useParams();
  const court = court1.id;
  const [formData, setFormData] = useState({});
  const [courtData, setCourt] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsReserved, setSlots1] = useState([]);

  const [minDate, setMinDate] = useState("");

  const user = "675e44b3b5b52b28ffd843a2";

  const bookduration = async () => {
    const { day, time, duration } = formData;

    const isAvailable = () => {
      for (let i = 0; i < parseInt(duration); i++) {
        const currentSlot = parseInt(time) + i;
        const slotAvailable = slots.some(
          (slot) => slot.number === currentSlot && slot.day === day
        );

        if (!slotAvailable) {
          return false;
        }
      }
      return true;
    };

    if (!isAvailable) {
      alert("Selected slots are not all available");
      return;
    }

    try {
      for (let i = 0; i < parseInt(duration); i++) {
        const payload = {
          user,
          court,
          day,
          slotNumber: parseInt(time) + i,
        };

        const response = await fetch("http://127.0.0.1:3000/api/reservations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Booking failed");
        }
      }

      alert(
        `Booking Successful!\nDate: ${day}\nTime: ${time}\nDuration: ${duration}`
      );
      fetchCourt();
    } catch (error) {
      alert("Failed to book the court. Please try again.");
      console.error("Booking error:", error);
    }
  };

  const fetchCourt = async () => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    setMinDate(formattedToday);

    fetch(`http://127.0.0.1:3000/api/courts/${court}`)
      .then((response) => response.json())
      .then((data) => {
        setCourt(data.court);
        setSlots(getAvailableSlots(data.court.schedule));
        setSlots1(getReservedSlots(data.court.schedule));
      })
      .catch((error) => console.error("Error fetching court:", error));
  };
  useEffect(() => {
    fetchCourt();
  }, [court]);

  const getAvailableSlots = (schedule) => {
    const availableSlots = [];
    schedule.forEach((daySchedule) => {
      daySchedule.slots.forEach((slot) => {
        if (!slot.reserved) {
          availableSlots.push({
            number: slot.number,
            day: daySchedule.day,
          });
        }
      });
    });
    return availableSlots;
  };
  const getReservedSlots = (schedule) => {
    const availableSlots = [];
    schedule.forEach((daySchedule) => {
      daySchedule.slots.forEach((slot) => {
        if (slot.reserved) {
          availableSlots.push({
            number: slot.number,
            day: daySchedule.day,
          });
        }
      });
    });
    return availableSlots;
  };

  const durations = [
    { value: 1, label: "1 Hours" },
    { value: 2, label: "2 Hours" },
    { value: 3, label: "3 Hours" },
    { value: 4, label: "4 Hours" },
    { value: 5, label: "5 Hours" },
    { value: 6, label: "6 Hours" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      // If the date is being changed, update the day based on the selected date
      if (name === "date" && value) {
        const selectedDay = new Date(value).toLocaleString("en-us", {
          weekday: "long",
        });
        updatedData.day = selectedDay;
      }

      return updatedData;
    });
  };

  const day = formData.day || "";

  const filteredSlots = slots.filter((slot) => slot.day === day);
  const filteredSlotsReserved = slotsReserved.filter(
    (slot) => slot.day === day
  );

  return (
    <div
      className="padel-body"
      style={{
        backgroundImage: `url(${require("../assets/padel-ball-net_755219-104.png")})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <div className="padel-page-container">
        <div
          className="padel-court-header"
          style={{ backgroundImage: `url(${require("../assets/R.jpg")})` }}
        >
          <div className="padel-court-contact-info">
            <h2>{courtData ? courtData.name : "Loading..."}</h2>
            <p>{courtData ? courtData.location : "Loading location..."}</p>
            <p>+201120966038</p>
          </div>
        </div>

        {/* Booking Section */}
        <section className="padel-booking-section">
          <h2>Book within one week</h2>
          <form
            className="padel-booking-form"
            onSubmit={(e) => {
              e.preventDefault();
              bookduration();
            }}
          >
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              min={minDate}
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="time">Time</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">Select time</option>
              {filteredSlots.length > 0 ? (
                filteredSlots.map((slot) => (
                  <option
                    key={slot.number}
                    value={slot.number}
                  >{` ${slot.number} clock`}</option>
                ))
              ) : (
                <option value="">No available slots</option>
              )}
            </select>

            <label htmlFor="duration">Duration</label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            >
              <option value="">Select duration</option>
              {durations.map((duration, index) => (
                <option key={index} value={duration.value}>
                  {duration.label}
                </option>
              ))}
            </select>

            <p>
              Price:{" "}
              <strong>{courtData ? courtData.price : "Loading..."} LE</strong>
            </p>
            <button type="submit">Book</button>
          </form>
        </section>

        {/* Available Slots Section */}
        <section className="padel-slots-section">
          <h3 style={{ textAlign: "center", color: "green", fontSize: "20px" }}>
            Available Slots
          </h3>
          <div className="padel-slots-grid">
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slot) => (
                <div
                  key={slot.number}
                  className="padel-slot padel-slot-available"
                >
                  {` ${slot.number} clock (${slot.day})`}
                </div>
              ))
            ) : (
              <div
                style={{ textAlign: "center", color: "red", fontSize: "20px" }}
              ></div>
            )}
          </div>
        </section>

        {/* Reserved Slots Section */}
        <section className="padel-slots-section">
          <h3 style={{ textAlign: "center", color: "red", fontSize: "20px" }}>
            Reserved Slots
          </h3>
          <div className="padel-slots-grid">
            {filteredSlotsReserved.length > 0 ? (
              filteredSlotsReserved.map((slot) => (
                <div
                  key={slot.number}
                  className="padel-slot padel-slot-reserved"
                >
                  {` ${slot.number} clock (${slot.day})`}
                </div>
              ))
            ) : (
              <div
                style={{ textAlign: "center", fontSize: "20px", color: "blue" }}
              ></div>
            )}
          </div>
        </section>

        {/* Ratings Section */}
        <section className="padel-ratings-section">
          <h3>Ratings & Comments</h3>
          <p>Share your experience here!</p>
        </section>

        {/* Map Section */}
        <section className="padel-map-section">
          <h3>Find us now</h3>
          <iframe
            src="https://maps.google.com/maps?q=6%20October%20City,%20Egypt&t=&z=13&ie=UTF8&iwloc=&output=embed"
            title="Google Map"
            frameBorder="0"
          ></iframe>
          <p className="padel-map-footer">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PadelBooking;
