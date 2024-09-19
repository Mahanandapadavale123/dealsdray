import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./views/login";
import AdminDashboard from "./views/AdminDashboard";
// import EmployeeList from "./views/EmployeeList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/users/isAuthenticated", {
          withCredentials: true,  // Ensure cookies are sent with the request
        });
        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("Error checking authentication:", error);
        setIsLoggedIn(false);  // If error occurs, assume user is not logged in
      } 
    };
    checkAuthentication();
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={<AdminDashboard /> }
        />
        {/* <Route
          path="/dashboard"
          element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
