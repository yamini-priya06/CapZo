// routes/eventRoutes.js

const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents, getEventById } = require("../controllers/eventController");
const { verifyToken, adminOnly } = require("../middleware/authMiddleware");

// ✅ Admin creates event
router.post("/", verifyToken, adminOnly, createEvent);

// ✅ Get all events (public)
router.get("/", getAllEvents);

// ✅ Get single event by ID
router.get("/:id", getEventById);

module.exports = router;