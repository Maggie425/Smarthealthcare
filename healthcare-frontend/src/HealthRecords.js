import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Recstyle.css";

const HealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    bp: "",
    sugar: "",
    heartbeat: "",
    notes: "",
  });

  
  useEffect(() => {
    axios.get("http://localhost:5000/api/health")
      .then(response => {
        setRecords(response.data);
      })
      .catch(error => {
        console.error("Error fetching records:", error);
      });
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      ...formData,
      date: new Date().toISOString() 
    };

    axios.post("http://localhost:5000/api/health", newRecord)
      .then(response => {
        setRecords(prev => [...prev, response.data]); 
        setFormData({ bp: "", sugar: "", heartbeat: "", notes: "" }); 
      })
      .catch(error => {
        console.error("Error submitting record:", error);
      });
  };

  return (
    <div className="records-section">
      <h2>Your Health History</h2>

      {}
      {records.length > 0 ? (
        <div className="record-grid">
          {records.map((record, index) => (
            <div className="record-card" key={index}>
              <h3>{new Date(record.date).toLocaleString()}</h3>
              <ul>
                <li><strong>BP:</strong> {record.bp}</li>
                <li><strong>Sugar:</strong> {record.sugar}</li>
                <li><strong>Heart Rate:</strong> {record.heartbeat}</li>
                
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-records">No records found.</p>
      )}
    </div>
  );
};

export default HealthRecords;
