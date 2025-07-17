import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("userName");
    
    navigate("/");
    window.location.reload(); 
  };

  return (
    <>
     
      <div className="hero">
        <div className="hero-content">
          <h1>Your Health. Your Records. Your Way.</h1>
          <p>
            Securely manage your medical records, track vital stats, and access top hospitals —
            all from one intuitive platform.
          </p>
        </div>
      </div>

      <section className="about" id="about">
        <h1>About Us</h1>
        <p>
          Welcome to our smart healthcare platform — your digital health companion. From tracking your
          vital signs to uploading reports and finding the best hospitals nearby, we make health record
          management effortless. Your privacy and convenience are our top priorities.
        </p>
      </section>

      <section className="service" id="service">
        <h1>Our Services</h1>
        <p>
          ✅ Store and access health data securely <br />
          ✅ Upload and view prescriptions/reports on the go <br />
          ✅ Locate top hospitals using your location <br />
          ✅ Simple and user-friendly interface <br />
        </p>
      </section>
    </>
  );
};

export default Home;
