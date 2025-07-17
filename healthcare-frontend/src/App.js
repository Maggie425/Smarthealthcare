import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import HealthForm from "./HealthForm";
import HealthRecords from "./HealthRecords";
import HospitalsNearMe from "./HospitalsNearMe";
import MapComponent from "./MapComponent";
import HealthReport from "./HealthReport";
import HealthTips from './components/HealthTips';
import Signup from './pages/Signup';
import Login from './pages/Login'; 
import Navbar from "./Navbar"; 
import PrivateRoute from "./components/PrivateRoute";
import ChatbotPage from './pages/Chatbotpage';
import Chatting from './Chatpage';
import RuleBasedChatbot from "./RuleBasedChatbot";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {}
        <Route
          path="/health-form"
          element={
            <PrivateRoute>
              <HealthForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/health-records"
          element={
            <PrivateRoute>
              <HealthRecords />
            </PrivateRoute>
          }
        />
        <Route
          path="/hospitals-near-me"
          element={
            <PrivateRoute>
              <HospitalsNearMe />
            </PrivateRoute>
          }
        />
        <Route
          path="/Map-componenet"
          element={
            <PrivateRoute>
              <MapComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-health-report"
          element={
            <PrivateRoute>
              <HealthReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/health-tips"
          element={
            <PrivateRoute>
              <HealthTips />
            </PrivateRoute>
          }
        />
         <Route path="/chat" component={Chatting} />
        
        <Route path="/chatting" element={<ChatbotPage />} />

        <Route path="/chatbot" element={<RuleBasedChatbot />} />
      
      </Routes>
      
       
       
      
    </Router>
  );
}

export default App;
