// src/pages/Students.js
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout"; // Import the logout icon
import "../components/StudentProfile.css"; // Assuming this file contains your custom styles

const Students = () => {
  // State to store the profile picture
  const [profilePic, setProfilePic] = useState(null);
  const [studentsData, setStudentsData] = useState([]); // State to store student data

  // Fetch student data including marks from the backend
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/students"); // Modify this to your backend URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudentsData(data); // Set the student data including marks
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData(); // Call the function to fetch data when the component mounts
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <div className="students-page">
      <h1>Students Page</h1>
      <ul>
        {studentsData.map((student) => (
          <li key={student.id}>
            <h2>{student.name}</h2>
            <p>Marks: {JSON.stringify(student.marks)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
