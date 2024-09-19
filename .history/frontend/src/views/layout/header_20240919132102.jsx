// Header.js
import React from 'react';
import '../../css/navbar.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="logo">Logo</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/employee-list">Employee List</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
