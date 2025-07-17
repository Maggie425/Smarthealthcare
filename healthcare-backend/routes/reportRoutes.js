import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Report from "../models/Report.js"; 
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


router.post("/upload", upload.single("healthReport"), async (req, res) => {
  const customName = req.body.customName || "report";

  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "health_reports",
        public_id: customName.replace(/\s+/g, "_"),
      },
      async (error, result) => {
        if (error) return res.status(500).json({ message: "Upload failed" });

        const newReport = new Report({
          fileUrl: result.secure_url,
          name: customName,
        });

        await newReport.save();
        res.status(200).json({ message: "Upload successful", fileUrl: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find().sort({ uploadedAt: -1 });
    res.status(200).json({
      reports: reports.map((r) => ({
        fileUrl: r.fileUrl,
        name: r.name, 
      })),
    });
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});



router.delete("/delete", async (req, res) => {
  const { fileUrl } = req.body;

  if (!fileUrl) {
    return res.status(400).json({ message: "fileUrl is required" });
  }

  try {
    const publicId = fileUrl.split("/").slice(-1)[0].split(".")[0];
    await cloudinary.uploader.destroy(`health_reports/${publicId}`);
    await Report.deleteOne({ fileUrl });

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete report" });
  }
});


export default router;
