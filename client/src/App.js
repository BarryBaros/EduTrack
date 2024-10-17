// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentPage from './components/StudentPage'; // Import the StudentPage
import Navbar from './components/Navbar'; // Keep the Navbar import
import Login from './pages/Login';
import './components/StudentPage.css'; // Updated CSS for styling StudentPage

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // User starts as not authenticated

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Optionally perform other actions after login, e.g., fetch user data
    console.log('User has logged in');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Redirect to the login page after logout
    console.log('User has been logged out');
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        {/* Protecting routes - redirect to login if not authenticated */}
        <Route
          path="/"
          element={isAuthenticated ? <StudentPage onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        {/* Login Route */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
