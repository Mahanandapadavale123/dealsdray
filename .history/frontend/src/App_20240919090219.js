import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./views/login";
import EmployeeList from "./views/EmployeeList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);  // Track if the authentication check is still loading

  // Check if the user is authenticated by making a call to the backend
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
      } finally {
        setLoading(false);  // Finish loading once the check is complete
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    // Optionally, show a loading spinner or placeholder while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/employee-table"
          element={isLoggedIn ? <EmployeeList /> : <Navigate to="/login" />}
        />
        
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Redirect the home route based on login status */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/employee-table" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
