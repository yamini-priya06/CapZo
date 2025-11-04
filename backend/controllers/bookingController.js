import Booking from "../models/bookingModel.js";
import Hall from "../models/Hall.js";

// ✅ Create Booking
export const createBooking = async (req, res) => {
  try {
    console.log("📥 Received booking data:", req.body);

    const { userId, hallId, name, contactNumber, date, time, guests, paymentStatus } = req.body;

    if (!userId || !hallId || !name || !contactNumber || !date || !time || !guests) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if hall exists (optional)
    let hallExists = true;
    try {
      const hall = await Hall.findById(hallId);
      if (!hall) hallExists = false;
    } catch (err) {
      hallExists = false;
    }

    const booking = new Booking({
      userId,
      hallId,
      name,
      contactNumber,
      date,
      time,
      guests,
      paymentStatus: paymentStatus || "Pending",
    });

    const savedBooking = await booking.save();
    console.log("✅ Booking created:", savedBooking);

    res.status(201).json({
      message: hallExists
        ? "Booking created successfully (with DB hall)"
        : "Booking created successfully (static hall)",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

// ✅ Get Bookings by User
export const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId })
      .populate("hallId", "name location")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching user bookings:", error);
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

// ✅ Get All Bookings (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("hallId", "name location")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching all bookings:", error);
    res.status(500).json({ message: "Error fetching all bookings", error: error.message });
  }
};