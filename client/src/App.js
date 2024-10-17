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
    console.log('Login Info:', admissionNumber, staffNumber, pinNumber);
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
        <div className="flex-1 p-6">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/homepage" element={<Homepage />} />

            {/* Admin routes */}
            {isAuthenticated ? (
              <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/add-teacher" element={<AddTeacher />} />
                <Route path="/admin/add-student" element={<AddStudent />} />

                {/* Dashboard with Cards */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <div className="flex flex-wrap justify-center gap-6 p-6">
                      <Card title="Student Count">
                        <p>Total number of students enrolled in the school.</p>
                      </Card>
                      <Card title="Teacher Count">
                        <p>Total number of teachers available.</p>
                      </Card>
                      <Card title="Upcoming Events">
                        <p>Check out the upcoming events in the school.</p>
                      </Card>
                      <Card title="Attendance Report">
                        <p>View the attendance records of students.</p>
                      </Card>
                      <Card title="Add Student">
                        <AddStudent />
                      </Card>
                    </div>
                  }
                />
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
