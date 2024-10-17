// src/components/Topbar.js
import React from 'react';
import './Topbar.css';
import { FaUserCircle } from 'react-icons/fa';  // Importing logout icon

function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar-left">EduTrack</div>
      <div className="topbar-right">
        <FaUserCircle className="user-icon" />
        <button className="logout-button">Log out</button>
      </div>
    </div>
  );
}

export default Topbar;
