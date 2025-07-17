import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import reportRoutes from "./routes/reportRoutes.js";
import ReportModel from "./models/Report.js";
import authRoutes from "./routes/authRoutes.js";
import OpenAI from "openai";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/health", (await import("./routes/HealthRoutes.js")).default);
app.use("/", reportRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "health_reports",
    allowed_formats: ["jpg", "png", "pdf"],
  },
});

const upload = multer({ storage });


app.post("/upload", upload.single("healthReport"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      message: "File uploaded successfully",
      fileUrl: req.file.path,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Error uploading file" });
  }
});


app.get("/reports", async (req, res) => {
  try {
    const reports = await ReportModel.find();
    res.json({ reports: reports.map((r) => r.fileUrl) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant specialized in general healthcare guidance. Provide non-critical advice only, and always suggest users consult a doctor for serious issues.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res.status(500).json({ reply: "⚠️ Unable to fetch response at the moment." });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
