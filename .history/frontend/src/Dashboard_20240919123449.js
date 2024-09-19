import React from "react";
import "./css/dashboard.css";  // Adjust path if needed

const Dashboard = () => {
  return (
    <div className="container">
      <header>
        <p className="logo">Logo</p>
      </header>
      <table>
        <thead>
          <tr>
            <th>Home</th>
            <th>EmployeeList</th>
          </tr>
        </thead>
      </table>
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
