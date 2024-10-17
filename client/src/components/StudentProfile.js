// src/components/StudentProfile.js
import React from 'react';
import './StudentProfile.css';

function StudentProfile() {
  return (
    <div className="student-profile">
      <div className="profile-header">
        <div className="student-info">
          <h3>John Doe</h3>
          <p>Admission No: ADM001</p>
          <p>Class: 10A</p>
        </div>
      </div>

      <div className="grades-section">
        <div className="grades-card">
          <h4>Grades</h4>
          <table>
            <tbody>
              <tr><td>Math:</td><td>A</td></tr>
              <tr><td>English:</td><td>B+</td></tr>
              <tr><td>Physics:</td><td>A-</td></tr>
              <tr><td>Chemistry:</td><td>B</td></tr>
              <tr><td>Computer:</td><td>B</td></tr>
              <tr><td>Total:</td><td>87%</td></tr>
            </tbody>
          </table>
        </div>
        <div className="attendance-card">
          <h4>Attendance</h4>
          <div className="attendance-circle">
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
