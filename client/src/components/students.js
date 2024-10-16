import React from 'react';
import './students.css'; // Ensure to update CSS for better styling

const Student = () => {
  return (
    <div className="student-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <p className="sidebar-title">STUDENT</p>
        <ul className="social-icons">
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
            <img src="student-image-url" alt="Student" className="profile-pic"/>
          </div>
          <div className="student-details">
            <h2 className="student-name">John Doe</h2>
            <p className="student-adm"><strong>Adm No:</strong> 123456</p>
            <p className="student-class"><strong>Class:</strong> 10A</p>
          </div>
        </div>

        {/* Grades Table */}
        <div className="grades-table">
          <h3 className="table-title">Student Grades</h3>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {[
                "MATHS", "ENG", "KISW", "PHY", "BIO", "CHEM", 
                "GEO", "HIST", "BUS", "C.R.E", "COMP"
              ].map((subject) => (
                <tr key={subject}>
                  <td>{subject}</td>
                  <td><input type="number" placeholder="Enter Marks" /></td>
                  <td><input type="text" placeholder="Enter Grade" /></td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td> -- </td>
                <td> -- </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Attendance Section */}
        <div className="attendance-section">
          <h3>Attendance</h3>
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
