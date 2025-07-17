import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        fetchHospitals(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const fetchHospitals = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=10&apiKey=e6dec2dfc25d46ff9b55dd3a11cae905`
      );
      const data = await response.json();
      setHospitals(data.features);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  return (
    <MapContainer
      center={userLocation || [20, 77]} // Default to India if location is not available
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {userLocation && (
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {hospitals.map((hospital, index) => (
        <Marker
          key={index}
          position={[hospital.geometry.coordinates[1], hospital.geometry.coordinates[0]]}
        >
          <Popup>
            <b>{hospital.properties.name || "Unknown Hospital"}</b>
            <br />
            Address: {hospital.properties.address_line1 || "N/A"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
