import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons";

function TeachersPage({
  teacherName = "Mr John Kennedy",
}) {
  const [student, setStudent] = useState("");
  const [marks, setMarks] = useState({});
  const [remarks, setRemarks] = useState({});
  const [selectedClass, setSelectedClass] = useState("Form-1");
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchStatus, setSearchStatus] = useState("");
  const [searchedStudentName, setSearchedStudentName] = useState("");
  const [savedMarks, setSavedMarks] = useState({});
  const [savedRemarks, setSavedRemarks] = useState({});
  
  const subjects = [
    "Maths",
    "English",
    "Kiswahili",
    "Biology",
    "Chemistry",
    "Physics",
    "History",
  ];
  const classes = ["Form-1", "Form-2", "Form-3", "Form-4"];
  
  const navigate = useNavigate();

  // Load saved marks and remarks from localStorage on component mount
  useEffect(() => {
    const storedMarks = JSON.parse(localStorage.getItem("savedMarks")) || {};
    const storedRemarks = JSON.parse(localStorage.getItem("savedRemarks")) || {};
    setSavedMarks(storedMarks);
    setSavedRemarks(storedRemarks);
  }, []);

  // Save marks and remarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("savedMarks", JSON.stringify(savedMarks));
    localStorage.setItem("savedRemarks", JSON.stringify(savedRemarks));
  }, [savedMarks, savedRemarks]);

  const handleSearch = async () => {
    try {
      if (!student) {
        alert("Please enter a student admission number.");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:5555/students/admission_no/${student}`
      );

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched student data:", data);

      if (data && data.admission_no && data.admission_no.toString() === student) {
        setSearchedStudentName(data.name);
        setSearchStatus("Successful");
      } else {
        setSearchStatus("Student not found");
        alert("Student not found! Please check the admission number.");
      }
    } catch (error) {
      console.error("Error fetching student:", error);
      setSearchStatus("Error fetching student data");
      alert("Student not found!");
    }
  };

  const handleMarksChange = (subject, e) => {
    setMarks({ ...marks, [subject]: e.target.value });
  };

  const handleRemarksChange = (subject, e) => {
    setRemarks({ ...remarks, [subject]: e.target.value });
  };

  const calculateTotalMarks = () => {
    const total = Object.values(marks)
      .filter((mark) => mark !== "")
      .reduce((acc, curr) => acc + Number(curr), 0);
    return total;
  };

  const calculateGrade = (total) => {
    if (total >= 650) return "A";
    if (total >= 600) return "A-";
    if (total >= 550) return "B+";
    if (total >= 500) return "B";
    if (total >= 450) return "B-";
    if (total >= 400) return "C+";
    if (total >= 350) return "C";
    if (total >= 300) return "C-";
    if (total >= 200) return "D";
    return "E";
  };

  const handleSave = async () => {
    if (!searchedStudentName) {
      alert("Please search for a student before saving marks.");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5555/save_marks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: searchedStudentName,
          marks: marks,
          remarks: remarks,
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Network response was not ok: ${errorMessage}`);
      }
  
      const result = await response.json();
      alert(result.message);
  
      // Save the result with name, admissionNo, marks, remarks, and grade to localStorage
      const totalMarks = calculateTotalMarks();
      const grade = calculateGrade(totalMarks);
      const newResult = {
        name: searchedStudentName,
        admissionNo: student,
        marks: marks,
        remarks: remarks,  // Include remarks here
        grade: grade,
      };
  
      const storedResults = JSON.parse(localStorage.getItem("studentResults")) || [];
      storedResults.push(newResult);
      localStorage.setItem("studentResults", JSON.stringify(storedResults));
  
      setSavedMarks({ ...marks });
      setSavedRemarks({ ...remarks });
  
      setStudent("");
      setMarks({});
      setRemarks({});
    } catch (error) {
      console.error("Error saving marks:", error);
      alert("An error occurred while saving marks: " + error.message);
    }
  };

  

  const totalMarks = calculateTotalMarks();
  const grade = calculateGrade(totalMarks);

  const savedTotalMarks = Object.values(savedMarks)
    .filter((mark) => mark !== "")
    .reduce((acc, curr) => acc + Number(curr), 0);
  const savedGrade = calculateGrade(savedTotalMarks);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    alert('You have logged out!');
    navigate("/"); 
  };

  const navigateTo = (path) => {
    navigate(path);
    setMenuVisible(false); 
  };

  return (
    <div className="teachers-page">
      <div className="sidebar1">
        <div className="menu-toggle" onClick={toggleMenu}>
          {menuVisible ? <i className="bx bx-x"></i> : <i className="bx bx-menu"></i>}
        </div>
        {menuVisible && (
          <ul>
            <li onClick={() => navigateTo("/")}>Home</li>
            <li onClick={() => navigateTo("/classes")}>Classes</li>
            <li onClick={() => navigateTo("/results")}>Results</li>
            <li onClick={() => navigateTo("/students")}>Students</li>
            <li onClick={() => navigateTo("/settings")}>Settings</li>
            <li onClick={() => navigateTo("/dashboard")}>Dashboard</li>
            <li onClick={() => navigateTo("/attendance-report")}>Attendance-report</li>
          </ul>
        )}
        
      </div>
      <div className="social-icons">
         <i class='bx bxl-facebook-square' ></i>
         <i class='bx bxl-twitter'></i>
         <i class='bx bxl-linkedin-square' ></i>
        </div>
           <div className="main-content">
        <div className="header">
          <h1>{teacherName}</h1>
          <div className="logout-container" onClick={handleLogout}>
            <span className="logout-text">Logout</span>
            <i className="bx bx-log-out"></i>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            placeholder="Enter Admission Number:"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {searchStatus === "Successful" && (
          <div className="student-name"> {searchedStudentName}</div>
        )}

        <h2>Select Class</h2>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {classes.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>

        <h2 className="h2-attendance">MARKS ENTRY</h2>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject}>
                <td>{subject}</td>
                <td>
                  <input
                    type="number"
                    value={marks[subject] || ""}
                    onChange={(e) => handleMarksChange(subject, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={remarks[subject] || ""}
                    onChange={(e) => handleRemarksChange(subject, e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSave}>Save</button>
        <div className="results-container">
          <div className="results">Total Marks: {totalMarks}</div>
          <div className="results">Grade: {grade}</div>
        </div>

        {/* New Table to Display Saved Marks and Remarks */}
        {Object.keys(savedMarks).length > 0 && (
          <div className="saved-marks-container">
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
                {subjects.map((subject) => (
                  <tr key={subject}>
                    <td>{subject}</td>
                    <td>{savedMarks[subject]}</td>
                    <td>{savedRemarks[subject]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="results-container">
              <div className="results1">Total Marks: {savedTotalMarks}</div>
              <div className="results1">Grade: {savedGrade}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeachersPage;
