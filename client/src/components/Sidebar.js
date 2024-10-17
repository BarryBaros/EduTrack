// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>Dashboard</li>
        <li>Students</li>
        <li>Classes</li>
        <li>Attendance</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
