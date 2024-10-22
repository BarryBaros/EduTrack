// StudentPage.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Classes from './Classes';
import Settings from './Settings';
import Sidebarpg from './Sidebarpg';
import Students from './Students';

const StudentPage = () => {
  return (
    <Router>
      <div className="student-page">
        {/* Sidebar for Navigation Links */}
        <Sidebarpg />

        {/* Main content section */}
        <div className="main-content">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/classes">Classes</Link>
              </li>
              <li>
                <Link to="/students">Students</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </nav>

          {/* Routes for different components */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/students" element={<Students />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default StudentPage;
