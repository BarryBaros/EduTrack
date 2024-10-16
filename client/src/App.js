// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentProfile from './pages/StudentProfile';
import AcademicPerformance from './pages/AcademicPerformance';
import Attendance from './pages/Attendance';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar /> {/* Sidebar Component */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<StudentProfile />} />
            <Route path="/academic-performance" element={<AcademicPerformance />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
