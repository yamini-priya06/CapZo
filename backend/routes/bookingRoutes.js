import express from "express";
import {
  createBooking,
  getBookingsByUser,
  getAllBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);               // Create booking
router.get("/user/:userId", getBookingsByUser); // User dashboard
router.get("/admin", getAllBookings);           // Admin dashboard

export default router;