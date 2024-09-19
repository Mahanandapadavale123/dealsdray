import React from "react";
import Header from "./layout/header";
import "../css/dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="page-container">
      <Header />

      <main className="content">
          <h2>Welcome Admin Panel</h2>
      </main>

    </div>
  );
};

export default Dashboard;
