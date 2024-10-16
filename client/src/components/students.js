import React from 'react';
import './students.css'; // Ensure this file is styled properly

const Student = () => {
  return (
    <div className="student-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <h2>STUDENT</h2>
        <ul className="social-icons">
          <li><i className="fab fa-linkedin"></i></li>
          <li><i className="fab fa-facebook"></i></li>
          <li><i className="fab fa-youtube"></i></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Student Info */}
        <div className="student-info">
          <div className="student-image">
            <img src="https://via.placeholder.com/150" alt="Student" />
          </div>
          <div className="student-details">
            <h3>John Doe</h3>
            <p><strong>Adm No:</strong> 123456</p>
            <p><strong>Class:</strong> 10A</p>
          </div>
        </div>

        {/* Grades Table */}
        <div className="grades-table">
          <h4>Grades</h4>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>MATHS</td><td>A</td></tr>
              <tr><td>ENG</td><td>B+</td></tr>
              <tr><td>KISW</td><td>B</td></tr>
              <tr><td>PHY</td><td>A-</td></tr>
              <tr><td>BIO</td><td>B+</td></tr>
              <tr><td>CHEM</td><td>A</td></tr>
              <tr><td>GEO</td><td>B</td></tr>
              <tr><td>HIST</td><td>A-</td></tr>
              <tr><td>BUS</td><td>B+</td></tr>
              <tr><td>C.R.E</td><td>A</td></tr>
              <tr><td>COMP</td><td>A</td></tr>
              <tr className="total-row"><td>Total</td><td>89%</td></tr>
            </tbody>
          </table>
        </div>

        {/* Attendance Section */}
        <div className="attendance-section">
          <h4>Attendance</h4>
          <p>100%</p>
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
