import React from 'react';
import Header from './layout/header'; 
import Footer from './layout/footer'; 
import '../css/dashboard.css'; 

const AdminDashboard = () => {
  return (
    <div className="page-container">
      <Header />

      <main className="content">
        <h2></h2>
      </main>

      <Footer />

    </div>
  );
};

export default AdminDashboard;
