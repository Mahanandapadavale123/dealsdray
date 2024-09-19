import React from 'react';
import Header from './layout/header'; 
import Footer from './layout/footer'; 
import '../css/dashboard.css'; 

const AdminDashboard = () => {
  return (
    <div className="page-container">
      <Header />

      <main className="content">
        <h2> Admin Dashboard</p>
      </main>

      <Footer />

    </div>
  );
};

export default AdminDashboard;
