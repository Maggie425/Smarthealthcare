
import mongoose from "mongoose";

const HealthRecordSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: false 
  },
  bp: { type: String, required: true },
  sugar: { type: String, required: true },
  heartbeat: { type: String, required: true }, 
  date: { type: Date, default: Date.now },    
}, { timestamps: true });

module.exports = mongoose.model("HealthRecord", HealthRecordSchema);
