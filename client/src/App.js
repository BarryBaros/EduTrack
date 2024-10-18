import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import AddTeacher from './components/AddTeacher';
import AddStudent from './components/AddStudent';
import Card from './components/Card'; // Import Card component

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (admissionNumber, staffNumber, pinNumber) => {
        if (admissionNumber === 'admin' && staffNumber === 'admin' && pinNumber === '1234') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <Router>
            <div className="flex min-h-screen bg-gray-100">
                {isAuthenticated && <Sidebar />}
                <div className={`flex-1 ${isAuthenticated ? 'ml-1/6' : ''} p-6`}>
                    <Routes>
                        <Route path="/" element={<Login onLogin={handleLogin} />} />
                        {isAuthenticated ? (
                            <>
                                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                <Route path="/admin/add-teacher" element={<AddTeacher />} />
                                <Route path="/admin/add-student" element={<AddStudent />} />
                            </>
                        ) : (
                            <Route path="*" element={<Navigate to="/" replace />} />
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
