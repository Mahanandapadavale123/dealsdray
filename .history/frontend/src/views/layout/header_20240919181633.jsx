import React from 'react';
import '../../css/navbar.css';

const Header = () => {
  return (
    <header class="header">
      <div class="row">
        <div class="logo">DealsDray Logo</div>
      </div>
        <nav class="navbar">
            
            <ul class="nav-links">
                <li><a href="/dashboard">Home</a></li>
                <li><a href="/employee-list">Employee List</a></li>
            </ul>

            <ul class="nav-links">
                <li><a href="/dashboard">User Name</a></li>
                <li><a href="/employee-list">Logout</a></li>
            </ul>
            

        </nav>
    </header>

  );
};

export default Header;
