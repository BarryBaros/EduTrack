// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import About from './components/About';
import Teachers from './components/Teachers';
import StudentsReport from './components/StudentsReport';
import AttendanceReport from './components/AttendanceReport';
import Admin from './components/Admin';
import AdminDashboard from './components/AdminDashboard';
import AddTeacher from './components/AddTeacher';
import AddStudent from './components/AddStudent';
import Sidebarpg from './components/Sidebarpg';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Classes from './components/Classes';
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
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginWithRedirect onLogin={handleLogin} />} />
        <Route path="/about" element={<About />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/students-report" element={<StudentsReport />} />
        <Route path="/attendance-report" element={<AttendanceReport />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-teacher" element={<AddTeacher />} />
        <Route path="/admin/add-student" element={<AddStudent />} />

        {/* Student Pages with Sidebar Layout */}
        <Route path="/student/*" element={<SidebarpgLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="classes" element={<Classes />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

// Redirect after login logic
const LoginWithRedirect = ({ onLogin }) => {
  const handleLoginSuccess = (admissionNumber, staffNumber, pinNumber) => {
    onLogin(admissionNumber, staffNumber, pinNumber);
    // Redirect to the student dashboard after login
    window.location.href = '/student/dashboard';
  };

  return <Login onLogin={handleLoginSuccess} />;
};

// Sidebar Layout Wrapper (with fixed layout and no space between content)
const SidebarpgLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebarpg />
      {/* Content aligned directly next to the sidebar */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
