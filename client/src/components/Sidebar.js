// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';
import { FaHome, FaUserGraduate, FaClipboardList, FaCogs } from 'react-icons/fa'; // Importing icons

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">EduTrack</h2>
      <ul>
        <li><FaHome /> Dashboard</li>
        <li><FaUserGraduate /> Students</li>
        <li><FaClipboardList /> Classes</li>
        <li><FaCogs /> Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
