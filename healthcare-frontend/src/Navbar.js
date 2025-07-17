import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";  

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/health-form")}>Enter Details</button>
        <button onClick={() => navigate("/health-records")}>Records</button>
        <button onClick={() => navigate("/upload-health-report")}>Upload</button>
        <button onClick={() => navigate("/hospitals-near-me")}>Hospitals</button>
        <button onClick={() => navigate("/health-tips")}>Health Tips</button>
        <button onClick={() => navigate("/chatbot")}>Chatbot</button>
        {!userName && <button onClick={() => navigate("/signup")}>Signup</button>}
        {!userName && <button onClick={() => navigate("/login")}>Login</button>}
        {userName && <button onClick={handleLogout}>Logout</button>}
      </div>
  );
};

export default Navbar;
