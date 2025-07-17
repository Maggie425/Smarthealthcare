import React, { useState } from "react";
import axios from "axios";
import "./HealthForm.css";

const HealthForm = () => {
  const [formData, setFormData] = useState({
    bp: "",
    sugar: "",
    heartbeat: "",
    notes: "", // ✅ New notes field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      date: new Date().toISOString(), 
    };

    try {
      await axios.post("http://localhost:5000/api/health", submissionData);
      alert("Health details saved successfully!");
      setFormData({ bp: "", sugar: "", heartbeat: "", notes: "" }); 
    } catch (error) {
      console.error("Error saving health details", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Enter Health Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Blood Pressure:</label>
        <input type="text" name="bp" value={formData.bp} onChange={handleChange} required />

        <label>Blood Sugar:</label>
        <input type="text" name="sugar" value={formData.sugar} onChange={handleChange} required />

        <label>Heartbeat:</label>
        <input type="text" name="heartbeat" value={formData.heartbeat} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HealthForm;
