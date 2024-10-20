// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserGraduate, FaClipboardList, FaCogs } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ isVisible }) {
  return (
    <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
      <h2 className="sidebar-title">EduTrack</h2>
      <ul>
        <li>
          <NavLink to="/" className="nav-link" activeClassName="active-link">
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/students" className="nav-link" activeClassName="active-link">
            <FaUserGraduate /> Students
          </NavLink>
        </li>
        <li>
          <NavLink to="/classes" className="nav-link" activeClassName="active-link">
            <FaClipboardList /> Classes
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="nav-link" activeClassName="active-link">
            <FaCogs /> Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;