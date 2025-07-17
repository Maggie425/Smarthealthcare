import React, { useState, useEffect } from "react";
import "./Hostyle.css";

function HospitalsNearMe() {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchHospitals(latitude, longitude);
        },
        (error) => {
          setError("Location access denied. Enable it to find hospitals.");
        }
      );
    } else {
      setError("Geolocation is not supported in this browser.");
    }
  }, []);

  const fetchHospitals = async (lat, lon) => {
    const query = `
      [out:json];
      node["amenity"="hospital"](around:5000, ${lat}, ${lon});
      out;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const hospitalList = data.elements.map((hospital) => ({
        name: hospital.tags.name || "Unknown Hospital",
        lat: hospital.lat,
        lon: hospital.lon,
      }));
      setHospitals(hospitalList);
    } catch (error) {
      setError("Failed to fetch hospital data.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#2c3e50" }}>
        🏥 Hospitals Near You
      </h2>
  
      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : hospitals.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              style={{
                border: "1px solid rgba(0,0,0)",
                borderRadius: "10px",
                padding: "20px",
                background:"rgba(19, 196, 199, 0.5)",
                boxShadow: "0 4px 8px rgba(25, 199, 19, 0.68)",
                backgroundColor: "#fff",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3 style={{ color: "#34495e" }}>{hospital.name}</h3>
              <p>
                <a
                  href={`https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1abc9c", textDecoration: "none", fontWeight: "bold" }}
                >
                  📍 View on Map
                </a>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          Finding hospitals near you...
        </p>
      )}
    </div>
  );
  
}

export default HospitalsNearMe;
