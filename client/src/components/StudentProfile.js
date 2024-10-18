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
          <h4>Grades & Marks</h4>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Math:</td><td>95/100</td><td>A</td></tr>
              <tr><td>English:</td><td>88/100</td><td>B+</td></tr>
              <tr><td>Physics:</td><td>92/100</td><td>A-</td></tr>
              <tr><td>Chemistry:</td><td>85/100</td><td>B</td></tr>
              <tr><td>Computer:</td><td>78/100</td><td>B</td></tr>
              <tr><td><b>Total:</b></td><td><b>438/500</b></td><td><b>87%</b></td></tr>
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
