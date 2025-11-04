import mongoose from "mongoose";

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model("Hall", hallSchema);