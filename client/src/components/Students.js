// src/pages/Students.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; // Import the logout icon
import '../components/StudentProfile.css'; // Assuming this file contains your custom styles

const Students = () => {
  // State to store the profile picture
  const [profilePic, setProfilePic] = useState(null);

  // Fetch the profile picture from localStorage when the component loads
  useEffect(() => {
    const storedPic = localStorage.getItem('profilePic');
    if (storedPic) {
      setProfilePic(storedPic);
    }
  }, []);

  const navigate = useNavigate();

  // Dynamic data for student profile
  const studentData = {
    name: 'John Doe',
    admissionNo: 'ADM001',
    class: '10A',
    grades: [
      { subject: 'Math', marks: '95/100', grade: 'A' },
      { subject: 'English', marks: '88/100', grade: 'B+' },
      { subject: 'Physics', marks: '92/100', grade: 'A-' },
      { subject: 'Chemistry', marks: '85/100', grade: 'B' },
      { subject: 'Computer', marks: '78/100', grade: 'B' },
    ],
    totalMarks: '438/500',
    percentage: '87%',
    attendance: '100%',
  };

  // Logout handler (can be hooked to authentication logic)
  const handleLogout = () => {
   
    alert('You have logged out!');
    navigate('/')
    // Add your logout logic here (e.g., clearing session, redirecting to login page)
  };

  return (
    <div className="student-page">
      {/* Logout Button */}
      <Button
        color="inherit"
        onClick={handleLogout}
        style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '1rem', textTransform: 'none' }}
        startIcon={<LogoutIcon style={{ fontSize: '1.5rem' }} />} // Adding icon next to text
      >
        Logout
      </Button>

      <h1>Student</h1>

      <div className="student-profile">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-picture">
            <img
              src={profilePic || 'https://via.placeholder.com/150'} // Default image if none uploaded
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <div className="student-info">
            <h3>{studentData.name}</h3>
            <p>Admission No: {studentData.admissionNo}</p>
            <p>Class: {studentData.class}</p>
          </div>
        </div>

        {/* Grades and Attendance Section */}
        <div className="grades-section">
          {/* Grades */}
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
                {studentData.grades.map((grade, index) => (
                  <tr key={index}>
                    <td>{grade.subject}</td>
                    <td>{grade.marks}</td>
                    <td>{grade.grade}</td>
                  </tr>
                ))}
                <tr>
                  <td><b>Total:</b></td>
                  <td><b>{studentData.totalMarks}</b></td>
                  <td><b>{studentData.percentage}</b></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Attendance */}
          <div className="attendance-card">
            <h4>Attendance</h4>
            <div className="attendance-circle">
              <span>{studentData.attendance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
