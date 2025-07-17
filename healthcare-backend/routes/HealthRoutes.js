import express from "express";
import Health from "../models/Health.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const newHealth = new Health(req.body);
    await newHealth.save();
    res.status(201).json({ message: "Health details saved!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const records = await Health.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
