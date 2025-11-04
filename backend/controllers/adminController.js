import Booking from "../models/bookingModel.js";

export const getAllBookings = async (req, res) => {
  try {
    console.log("🧩 Admin Request From:", req.user);

    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("hallId", "name location");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching admin data:", error);
    res.status(500).json({ message: "Failed to fetch admin data" });
  }
};