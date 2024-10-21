// src/pages/Students.js
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; // Import the logout icon
import '../components/StudentProfile.css'; // Assuming this file contains your custom styles

const Students = () => {
  // State to store the student data
  const [studentData, setStudentData] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the student data and grades from the backend when the component loads
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Fetch student profile details
        const studentResponse = await fetch('http://localhost:5555/api/student/1', {
          method: 'GET',
          credentials: 'include', // For session cookies
        });

        // Fetch student grades
        const gradesResponse = await fetch('http://localhost:5555/api/students/1/grades', {
          method: 'GET',
          credentials: 'include',
        });

        if (!studentResponse.ok || !gradesResponse.ok) {
          throw new Error('Error fetching student data');
        }

        const studentData = await studentResponse.json();
        const gradesData = await gradesResponse.json();

        // Update student state
        setStudentData({
          ...studentData,
          grades: gradesData, // Set grades from API
        });

        setProfilePic(studentData.image); // Set the student's profile picture
      } catch (err) {
        setError('Failed to load student data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  // Logout handler (can be hooked to authentication logic)
  const handleLogout = () => {
    alert('You have logged out!');
    // Add your logout logic here (e.g., clearing session, redirecting to login page)
  };

  // Handle error or loading state
  if (loading) {
    return <div>Loading student data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            <p>Admission No: {studentData.admission_no}</p>
            <p>Class: {studentData.class_name}</p>
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
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {studentData.grades.map((grade, index) => (
                  <tr key={index}>
                    <td>{grade.subject}</td>
                    <td>{grade.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attendance */}
          <div className="attendance-card">
            <h4>Attendance</h4>
            <div className="attendance-circle">
              <span>{studentData.attendance}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
