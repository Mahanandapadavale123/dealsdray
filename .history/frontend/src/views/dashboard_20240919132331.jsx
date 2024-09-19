import React from 'react';
import Header from './layout/header'; // Import the Header component
import Footer from './layout/Footer'; // Import the Footer component
import '../css/dashboard.css'; // Import your page's styling

const Dashboard = () => {
  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <h2>Welcome to the Dashboard</h2>
        <p>This is the main content of your dashboard.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
