import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Teachers from './components/Teachers';
import StudentsReport from './components/StudentsReport';
import AttendanceReport from './components/AttendanceReport';
import Admin from './components/Admin';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/students-report" element={<StudentsReport />} />
                <Route path="/attendance-report" element={<AttendanceReport />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};
=======
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
>>>>>>> 58e5de7873bebc93938c08cb6d2b95fd106a8ad6

export default App;
