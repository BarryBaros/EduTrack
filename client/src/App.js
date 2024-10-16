// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentProfile from './pages/StudentProfile';
import AcademicPerformance from './pages/AcademicPerformance';
import Attendance from './pages/Attendance';
import Assignments from './pages/Assignments';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentProfile />} />
        <Route path="/academic-performance" element={<AcademicPerformance />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </Router>
  );
}

export default App;


