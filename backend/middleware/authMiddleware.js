import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Verify JWT
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Auth error:", error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// ✅ Check Admin Role
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else {
    console.log("🚫 Access denied for:", req.user?.email);
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};