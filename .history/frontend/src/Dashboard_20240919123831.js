import React from "react";
import "./css/dashboard.css";  // Adjust path if needed

const Dashboard = () => {
  return (
    <div className="container">
        <p className="logo">Logo</p>
      
      
            <header>
            <h3>Home</h3>
            <h3>EmployeeList</h3>

            </header>
            
      <div className="dashboard-content">
        <p>Dashboard</p>
        <h2>Welcome to the Dashboard</h2>
      </div>
      <footer>
        <p>Footer content goes here</p>
      </footer>
    </div>
  );
};

export default Dashboard;
