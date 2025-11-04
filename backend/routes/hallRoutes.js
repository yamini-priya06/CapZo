import express from "express";
import Hall from "../models/Hall.js";

const router = express.Router();

// ✅ Add new hall
router.post("/add", async (req, res) => {
  try {
    const hall = new Hall(req.body);
    await hall.save();
    res.status(201).json({ message: "Hall added successfully", hall });
  } catch (error) {
    console.error("Error adding hall:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get halls by city (for frontend Availability page)
router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    const query = city ? { city: new RegExp(city, "i") } : {};
    const halls = await Hall.find(query);
    res.status(200).json(halls);
  } catch (error) {
    console.error("Error fetching halls:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;