// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css'; // Import custom CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-logo">Website</a>
      </div>
      <div className="navbar-right">
        <ul className="navbar-list">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? "navItem activeLink" : "navItem")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => (isActive ? "navItem activeLink" : "navItem")}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => (isActive ? "navItem activeLink" : "navItem")}
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
