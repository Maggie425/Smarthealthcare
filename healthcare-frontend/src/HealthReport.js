import React, { useState, useEffect } from "react";
import './HealthReport.css';

function HealthReport() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [customName, setCustomName] = useState(""); 
  const [uploadedReports, setUploadedReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:5000/reports");
        const data = await response.json();
        if (response.ok) {
          setUploadedReports(data.reports);
        } else {
          console.error("Failed to fetch reports:", data.message);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDelete = async (fileUrl) => {
    try {
      const response = await fetch("http://localhost:5000/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileUrl }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("File deleted successfully!");
        setUploadedReports((prev) =>
          prev.filter((report) => report.fileUrl !== fileUrl)
        );
      } else {
        alert(data.message || "Failed to delete file.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("An error occurred while deleting.");
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile || !customName.trim()) {
      alert("Please select a file and enter a name!");
      return;
    }

    const formData = new FormData();
    formData.append("healthReport", selectedFile);
    formData.append("customName", customName); 

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("File uploaded successfully!");
        setUploadedReports((prev) => [...prev, { fileUrl: data.fileUrl, name: customName }]);
        setSelectedFile(null);
        setCustomName(""); 
      } else {
        alert(data.message || "File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading.");
    }
  };

  return (
    <div className="health-container">

    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Upload Your Health Reports</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <input
        type="text"
        placeholder="Enter custom name for the report"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
        style={{ marginTop: "10px", padding: "5px", width: "60%" }}
      />
      <br />
      <button onClick={handleUpload} style={{ marginTop: "10px" }}>
        Upload
      </button>

      <h3>Uploaded Reports</h3>
      {uploadedReports.length > 0 ? (
        <ul>
         <ul>
  {uploadedReports.map((report, index) => (
    <li key={index}>
      <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
        {report.name || `View Report ${index + 1}`}
      </a>
      <button onClick={() => handleDelete(report.fileUrl)}>Delete</button>
    </li>
  ))}
</ul>

        </ul>
      ) : (
        <p>No reports uploaded yet.</p>
      )}
    </div>
    </div>
  );
}

export default HealthReport;
