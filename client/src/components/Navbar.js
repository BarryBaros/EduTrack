// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Profile</Link></li>
        <li><Link to="/academic-performance">Academic Performance</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/assignments">Assignments</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
