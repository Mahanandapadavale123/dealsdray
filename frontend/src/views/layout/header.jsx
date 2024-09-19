import React from "react";
import "../../css/navbar.css";

const Header = () => {
  return (
    <>
      <div className="row topbar">
        <div className="logo">DealsDray Logo</div>
      </div>

      <header className="header">
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <a href="/dashboard">Home</a>
            </li>
            <li>
              <a href="/employees">Employee List</a>
            </li>
          </ul>

          <ul className="nav-links">
            <li>
              <a href="/dashboard">User Name</a>
            </li>
            <li>
              <a href="/employee-list">Logout</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
