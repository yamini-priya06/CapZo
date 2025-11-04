import Booking from "../models/bookingModel.js";
import Hall from "../models/Hall.js";
import User from "../models/User.js";

// ✅ CREATE A NEW BOOKING
export const createBooking = async (req, res) => {
  try {
    const { userId, hallId, name, contactNumber, date, time, guests, paymentStatus } = req.body;

    // Check if hall exists
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }

    // Optional: Check for duplicate booking (same hall + same date & time)
    const existingBooking = await Booking.findOne({ hallId, date, time });
    if (existingBooking) {
      return res.status(400).json({ message: "This hall is already booked for the selected date & time" });
    }

    // Create booking
    const newBooking = new Booking({
      userId,
      hallId,
      name,
      contactNumber,
      date,
      time,
      guests,
      paymentStatus,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking successful!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ GET ALL BOOKINGS (for admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")  // include user details
      .populate("hallId", "name city price") // include hall details
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

// ✅ GET BOOKINGS FOR A SPECIFIC USER
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;

    const bookings = await Booking.find({ userId })
      .populate("hallId", "name city price")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching user bookings:", error);
    res.status(500).json({ message: "Failed to fetch user bookings", error });
  }
};

// ✅ CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("❌ Error cancelling booking:", error);
    res.status(500).json({ message: "Failed to cancel booking", error });
  }
};
