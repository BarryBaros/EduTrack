import React from 'react';
import './students.css'; // Create a CSS file for styling

const Student = () => {
  return (
    <div className="student-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <p>STUDENT</p>
        <ul>
          <li><i className="icon-linkedin"></i></li>
          <li><i className="icon-facebook"></i></li>
          <li><i className="icon-youtube"></i></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Student Info */}
        <div className="student-info">
          <div className="student-image">
            <img src="student-image-url" alt="Student" />
          </div>
          <div className="student-details">
            <p>Name: John Doe</p>
            <p>Adm No: 123456</p>
            <p>Class: 10A</p>
          </div>
        </div>

        {/* Grades Table */}
        <div className="grades-table">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>MATHS</td><td></td></tr>
              <tr><td>ENG</td><td></td></tr>
              <tr><td>KISW</td><td></td></tr>
              <tr><td>PHY</td><td></td></tr>
              <tr><td>BIO</td><td></td></tr>
              <tr><td>CHEM</td><td></td></tr>
              <tr><td>GEO</td><td></td></tr>
              <tr><td>HIST</td><td></td></tr>
              <tr><td>BUS</td><td></td></tr>
              <tr><td>C.R.E</td><td></td></tr>
              <tr><td>COMP</td><td></td></tr>
              <tr><td>Total</td><td></td></tr>
            </tbody>
          </table>
        </div>

        {/* Attendance Section */}
        <div className="attendance-section">
          <p>ATTENDANCE: 100%</p>
          <div className="progress-circle">
            <div className="circle">
              <div className="mask full">
                <div className="fill"></div>
              </div>
              <div className="mask half">
                <div className="fill"></div>
              </div>
              <div className="inside-circle">100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
