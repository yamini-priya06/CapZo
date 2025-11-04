import React, { useState } from "react";
import axios from "axios";
import "./BookingForm.css";

const BookingForm = ({ selectedHall, onClose }) => {
  // ✅ Get logged-in user info
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    date: "",
    time: "",
    guests: "",
    paymentStatus: "Pending",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedHall || !selectedHall._id) {
      alert("⚠️ No valid hall selected!");
      return;
    }

    if (!storedUser?._id) {
      alert("⚠️ Please log in before booking!");
      return;
    }

    const bookingData = {
      ...formData,
      userId: storedUser._id,
      hallId: selectedHall._id,
    };

    console.log("📦 Sending booking data:", bookingData);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/api/bookings", bookingData);

      if (res.status === 201) {
        setMessage("🎉 Booking Confirmed Successfully!");
        alert("✅ Booking created successfully!");
        onClose();
      } else {
        setMessage(res.data.message || "Booking failed. Try again.");
      }
    } catch (error) {
      console.error("❌ Booking error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Booking failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-modal">
      <div className="booking-content">
        <h2>Book {selectedHall?.name}</h2>

        <form onSubmit={handleSubmit} className="booking-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="guests"
            placeholder="Guests Count"
            value={formData.guests}
            onChange={handleChange}
            required
          />

          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>

          {/* ✅ Buttons in one row */}
          <div className="modal-buttons">
            <button type="submit" className="confirm-btn" disabled={loading}>
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
            <button
              type="button"
              className="close-btn"
              onClick={onClose}
              disabled={loading}
            >
              Close
            </button>
          </div>
        </form>

        {message && <p className="response-message">{message}</p>}
      </div>
    </div>
  );
};

export default BookingForm;
