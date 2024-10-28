import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import '../components/StudentProfile.css';

const Students = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [searchedStudentName, setSearchedStudentName] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [savedMarks, setSavedMarks] = useState({});
  const [savedRemarks, setSavedRemarks] = useState({});
  const [savedTotalMarks, setSavedTotalMarks] = useState('');
  const [savedGrade, setSavedGrade] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedPic = localStorage.getItem('profilePic');
    if (storedPic) setProfilePic(storedPic);

    const marks = JSON.parse(localStorage.getItem("savedMarks"));
    const remarks = JSON.parse(localStorage.getItem("savedRemarks"));
    const studentName = localStorage.getItem("searchedStudentName");
    const storedAdmissionNumber = localStorage.getItem("admissionNumber");

    setSavedMarks(marks || {});
    setSavedRemarks(remarks || {});
    setSearchedStudentName(studentName || '');
    setAdmissionNumber(storedAdmissionNumber || '');

    calculateTotalAndGrade(marks);
  }, []);

  const calculateTotalAndGrade = (marks) => {
    const totalMarks = Object.values(marks || {}).reduce((acc, mark) => acc + parseFloat(mark || 0), 0);
    let grade = '';

    if (totalMarks >= 90) grade = 'A';
    else if (totalMarks >= 80) grade = 'B';
    else if (totalMarks >= 70) grade = 'C';
    else if (totalMarks >= 60) grade = 'D';
    else grade = 'F';

    setSavedTotalMarks(totalMarks);
    setSavedGrade(grade);

    // Save calculated total and grade in localStorage
    localStorage.setItem("savedTotalMarks", totalMarks);
    localStorage.setItem("savedGrade", grade);
  };

  const handleLogout = () => {
    alert('You have logged out!');
    navigate('/');
  };

  const handleSave = () => {
    localStorage.setItem("searchedStudentName", searchedStudentName);
    localStorage.setItem("admissionNumber", admissionNumber);
  };

  return (
    <div className="student-page">
      <Button
        color="inherit"
        onClick={handleLogout}
        style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '1rem', textTransform: 'none' }}
        startIcon={<LogoutIcon style={{ fontSize: '1.5rem' }} />}
      >
        Logout
      </Button>

      <h1>Student</h1>

      <div className="student-profile">
        <div className="profile-header">
          <div className="profile-picture">
            <img
              src={profilePic || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <div className="student-info">
            <h3>{searchedStudentName || 'Student Name'}</h3>
            <p>Admission No: {admissionNumber || 'ADM001'}</p>
            <p>Class: 10A</p>
          </div>
        </div>

        <div className="input-fields">
          <input
            type="text"
            placeholder="Enter Student Name"
            value={searchedStudentName}
            onChange={(e) => setSearchedStudentName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Admission Number"
            value={admissionNumber}
            onChange={(e) => setAdmissionNumber(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>

        <div className="grades-section">
          <div className="grades-card">
            <h2 className="marks_grades_h2">Marks and grade for {searchedStudentName}</h2>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(savedMarks).map((subject) => (
                  <tr key={subject}>
                    <td>{subject}</td>
                    <td>{savedMarks[subject]}</td>
                    <td>{savedRemarks[subject]}</td>
                  </tr>
                ))}
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

        <div className="results-container">
          <div className="results">Total Marks: {savedTotalMarks}</div>
          <div className="results">Grade: {savedGrade}</div>
        </div>
      </div>
    </div>
  );
};

export default Students;
