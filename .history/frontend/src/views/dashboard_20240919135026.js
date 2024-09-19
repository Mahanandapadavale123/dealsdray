import React from 'react';
import Header from './layout/header'; 
import Footer from './layout/footer'; 
import '../css/dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="page-container">
      <Header />

      <main className="content">
        <h2>
          AdminDashboard
        </h2>
      </main>

      <Footer />

    </div>
  );
};

export default Dashboard;
