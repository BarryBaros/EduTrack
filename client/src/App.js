import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';  // Fix the import

function App() {
  const handleLogin = (admissionNumber, staffNumber, pinNumber) => {
    console.log('Login Info:', admissionNumber, staffNumber, pinNumber);
    // Perform login logic here
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} /> {/* Fixed Route */}  // Changed to '/' as per the requirement
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/homepage" element={<Homepage />} /> {/* Fixed Route */}
      </Routes>
    </Router>
  );
}

export default App;
