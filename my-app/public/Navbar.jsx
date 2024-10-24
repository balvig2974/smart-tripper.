import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './themeprovider';

export const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="container-fluid">
          <Link to="/">
            <img style={{ width: "50px", borderRadius: '50px' }} src='Logo.png' alt='Logo' />
          </Link>
          <ul className="nav nav-underline">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/trip_event">Trip Event</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Search</Link>
            </li>
          </ul>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={isDarkMode}
              onChange={toggleTheme}
              id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ color: "seablue" }}>
              Dark mode
            </label>
          </div>
        </div>
      </nav>
    </div>
  );
};
