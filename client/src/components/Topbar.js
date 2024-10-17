// src/components/Topbar.js
import React from 'react';
import './Topbar.css';

function Topbar() {
  return (
    <div className="topbar">
      <span>School Management System</span>
      <button className="logout-button">Logout</button>
    </div>
  );
}

export default Topbar;
