import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

export default App;
