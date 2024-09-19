import React from 'react';
import '../../css/navbar.css';

const Header = () => {
  return (
    <header class="header">
        <nav class="navbar">
            <div class="logo">DealsDray Logo</div>
            <ul class="nav-links">
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/employee-list">Employee List</a></li>
                <li><a href="/createemployee">CreateEmployee</a></li>

            </ul>
        </nav>
    </header>

  );
};

export default Header;
