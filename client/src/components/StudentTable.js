// src/components/StudentTable.js
import React from 'react';
import './StudentTable.css';

const studentData = [
  { name: 'John Doe', class: '10A', admissionNo: 'ADM001', grades: 'A', attendance: '90%' },
  { name: 'Jane Smith', class: '9B', admissionNo: 'ADM002', grades: 'B+', attendance: '85%' },
  // Add more students as needed
];

function StudentTable() {
  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Admission No</th>
          <th>Grades</th>
          <th>Attendance</th>
        </tr>
      </thead>
      <tbody>
        {studentData.map((student, index) => (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.class}</td>
            <td>{student.admissionNo}</td>
            <td>{student.grades}</td>
            <td>{student.attendance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
