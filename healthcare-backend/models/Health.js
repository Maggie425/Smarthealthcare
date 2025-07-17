import mongoose from "mongoose";

const HealthSchema = new mongoose.Schema(
  {
    bp: { type: String, required: true },
    sugar: { type: String, required: true },
    heartbeat: { type: String, required: true },
    notes: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);


const Health = mongoose.model("Health", HealthSchema);
export default Health;
