import React, { useState } from "react";
import "./Availability.css";
import BookingForm from "./BookingForm";

const Availability = () => {
  const [selectedHall, setSelectedHall] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [filteredHalls, setFilteredHalls] = useState([]);

  // ✅ Static hall data (acts like events)
  const halls = [
    {
      _id: "64a8b7f2c8e4e321abcde111",
      name: "Elegant Banquet Hall",
      city: "Hyderabad",
      capacity: 200,
      price: 12000,
      available: true,
    },
    {
      _id: "64a8b7f2c8e4e321abcde222",
      name: "Royal Palace Hall",
      city: "Hyderabad",
      capacity: 300,
      price: 18000,
      available: false,
    },
    {
      _id: "64a8b7f2c8e4e321abcde333",
      name: "Crystal Grand Hall",
      city: "Chennai",
      capacity: 400,
      price: 25000,
      available: true,
    },
    {
      _id: "64a8b7f2c8e4e321abcde444",
      name: "Sunset Lawn",
      city: "Bangalore",
      capacity: 350,
      price: 20000,
      available: false,
    },
    {
      _id: "64a8b7f2c8e4e321abcde555",
      name: "Blue Diamond Hall",
      city: "Bangalore",
      capacity: 250,
      price: 15000,
      available: true,
    },
  ];

  // ✅ Handle city search
  const handleSearch = () => {
    const results = halls.filter(
      (hall) => hall.city.toLowerCase() === searchCity.trim().toLowerCase()
    );
    setFilteredHalls(results);
  };

  return (
    <div className="availability-page">
      <h1 className="page-title">Search Halls by City</h1>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name (e.g. Hyderabad)"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Display halls */}
      <div className="halls-container">
        {filteredHalls.length === 0 ? (
          <p className="no-results">Search to see available halls.</p>
        ) : (
          filteredHalls.map((hall) => (
            <div
              key={hall._id}
              className={`hall-card ${hall.available ? "available" : "not-available"}`}
            >
              <h2>{hall.name}</h2>
              <p>City: {hall.city}</p>
              <p>Capacity: {hall.capacity} guests</p>
              <p>Price: ₹{hall.price}</p>
              <p>
                Status:{" "}
                <span
                  className={hall.available ? "available-text" : "not-available-text"}
                >
                  {hall.available ? "Available" : "Not Available"}
                </span>
              </p>
              {hall.available && (
                <button className="book-btn" onClick={() => setSelectedHall(hall)}>
                  Book Now
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Booking form modal */}
      {selectedHall && (
        <BookingForm selectedHall={selectedHall} onClose={() => setSelectedHall(null)} />
      )}
    </div>
  );
};

export default Availability;