import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Classes from './components/Classes';
import Teachers from './components/Teachers';
import StudentsReport from './components/StudentsReport';
import AttendanceReport from './components/AttendanceReport';
import Admin from './components/Admin';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import AddTeacher from './components/AddTeacher';
import AddStudent from './components/AddStudent';
import Sidebarpg from './components/Sidebarpg';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Settings from './components/Settings';
import './App.css';



const App = () => {
    const handleLogin = (admissionNumber, staffNumber, pinNumber) => {
        console.log('Login Info:', admissionNumber, staffNumber, pinNumber);
        // Perform login logic here
    };    

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/students-report" element={<StudentsReport />} />
                <Route path="/attendance-report" element={<AttendanceReport />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/sidebar" element={<Sidebar />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/add-teacher" element={<AddTeacher />} />
                <Route path="/admin/add-student" element={<AddStudent />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/sidebarpg" element={<Sidebarpg />} />
                </Routes>
        </Router>
    );
};

export default App;
