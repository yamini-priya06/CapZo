import express from "express";
import { getAllBookings } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Fetch all bookings (Admins only)
router.get("/bookings", protect, adminOnly, getAllBookings);

export default router;