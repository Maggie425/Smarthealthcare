import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  name: { type: String }, 
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Report", reportSchema);
