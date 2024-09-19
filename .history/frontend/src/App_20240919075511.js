import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import EmployeeTable from "./EmployeeTable";

function App() {
  // Check for token in localStorage to see if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // When the app loads, check if there is a token in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);  // Set the login state to true if token exists
    }
  }, []);

  // Function to set the token (from the login component)
  const setToken = (token) => {
    localStorage.setItem("authToken", token);  // Save token to localStorage
    setIsLoggedIn(true);  // Update the login state
  };

  return (
    <Router>
      <Routes>
        {/* If logged in, load the EmployeeTable page; otherwise, redirect to login */}
        <Route 
          path="/employee-table" 
          element={isLoggedIn ? <EmployeeTable /> : <Navigate to="/login" />} 
        />
        
        {/* Render the login page, pass the setToken function as a prop */}
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* Optional: If you want to redirect the home route */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/employee-table" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;