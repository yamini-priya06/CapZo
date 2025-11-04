import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    console.log("👤 Logged in user:", storedUser);

    if (storedUser) {
      setUserName(storedUser.name);
    }

    const userId = storedUser?._id;

    if (userId) {
      axios
        .get(`http://localhost:5001/api/bookings/user/${userId}`)
        .then((res) => {
          console.log("✅ Bookings fetched:", res.data);
          setBookings(res.data);
        })
        .catch((err) =>
          console.error("❌ Booking fetch error:", err.response?.data || err.message)
        );
    } else {
      console.warn("⚠️ No userId found in localStorage");
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="welcome-text">Welcome, {userName || "User"} 👋</h2>
      <h3 className="section-title">Your Booking History</h3>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>No previous bookings found 💺</p>
          <p>
            Book your first event from the <strong>Events</strong> page!
          </p>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <h3 className="hall-name">{b.hallId?.name || "Hall"}</h3>
              <p><strong>📅 Date:</strong> {b.date}</p>
              <p><strong>🕓 Time:</strong> {b.time}</p>
              <p><strong>📞 Contact:</strong> {b.contactNumber}</p>
              <p><strong>👤 Guests:</strong> {b.guests}</p>
              <p>
                <strong>💳 Payment Status:</strong>{" "}
                <span className={`status ${b.paymentStatus.toLowerCase()}`}>
                  {b.paymentStatus}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;