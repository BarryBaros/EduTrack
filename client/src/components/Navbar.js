// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Navbar = ({ onLogout }) => {
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear tokens or make an API call to logout
    console.log('User logged out');
    onLogout(); // Call the passed logout function
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#3f51b5', color: 'white' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
        <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link></li>
        <li><Link to="/academic-performance" style={{ color: 'white', textDecoration: 'none' }}>Academic Performance</Link></li>
        <li><Link to="/attendance" style={{ color: 'white', textDecoration: 'none' }}>Attendance</Link></li>
        <li><Link to="/assignments" style={{ color: 'white', textDecoration: 'none' }}>Assignments</Link></li>
      </ul>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
