import React from 'react';
import Header from './layout/header'; 
import Footer from './layout/footer'; 
import '../css/dashboard.css'; 

const Dashboard = () => {
  return (
    <div class="page-container">


      <Header />

      <main class="content">

        <h2>
          AdminDashboard
        </h2>

      </main>



      <Footer />

    </div>
  );
};

export default Dashboard;
