// pages/AcademicPerformance.js
import React, { useState } from 'react';

const AcademicPerformance = ({ role }) => {
  const [grades, setGrades] = useState([
    { subject: 'Math', marks: 90, grade: 'A' },
    { subject: 'English', marks: 85, grade: 'A-' },
  ]);

  const handleEdit = (index, newMarks) => {
    if (role === 'teacher') {
      const updatedGrades = [...grades];
      updatedGrades[index].marks = newMarks;
      setGrades(updatedGrades);
    } else {
      alert('Only teachers can edit grades.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Academic Performance</h1>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
            <th>Grade</th>
            {role === 'teacher' && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {grades.map((subject, index) => (
            <tr key={index}>
              <td>{subject.subject}</td>
              <td>{subject.marks}</td>
              <td>{subject.grade}</td>
              {role === 'teacher' && (
                <td>
                  <button onClick={() => handleEdit(index, prompt('New Marks:', subject.marks))}>
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcademicPerformance;
