import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./views/login";
import EmployeeList from "./views/EmployeeList";
import CreateEmployee from "./views/create.jsx";
import EditEmployee from "./views/edit.jsx"
import Dashboard from "./views/dashboard.jsx";


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
          element={<Dashboard /> }
        />
         <Route path="/employees" element={<EmployeeList />} />
         <Route path="/employees/create" element={<CreateEmployee />} />
         <Route path="/employees/edit/:id" element={<EditEmployee />} />

        {/* <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;