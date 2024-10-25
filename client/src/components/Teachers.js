import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import 'boxicons/css/boxicons.min.css';


function TeachersPage({
  teacherName = "Mr John Kennedy",
  studentName = "Sarah James",
}) {
  const [student, setStudent] = useState("");
  const [marks, setMarks] = useState({});
  const [remarks, setRemarks] = useState({});
  const [selectedClass, setSelectedClass] = useState("Form-1"); // State for selected class
  const [menuVisible, setMenuVisible] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [searchStatus, setSearchStatus] = useState("");
  const [notification, setNotification] = useState("");
  const [selectedYear, setSelectedYear] = useState("2010");
  const [searchedStudentName, setSearchedStudentName] = useState("");


  // Attendance state
  const [attendance, setAttendance] = useState({
    "First Term": {
      January: { present: 0, absent: 0 },
      February: { present: 0, absent: 0 },
      March: { present: 0, absent: 0 },
    },
    "Second Term": {
      May: { present: 0, absent: 0 },
      June: { present: 0, absent: 0 },
      July: { present: 0, absent: 0 },
    },
    "Third Term": {
      September: { present: 0, absent: 0 },
      October: { present: 0, absent: 0 },
      November: { present: 0, absent: 0 },
    },
  });

  const subjects = [
    "Maths",
    "English",
    "Kiswahili",
    "Biology",
    "Chemistry",
    "Physics",
    "History",
  ];
  const classes = ["Form-1", "Form-2", "Form-3", "Form-4"]; // List of classes
  const years = ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];

  const navigate = useNavigate(); // Initialize the navigate function
  
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/students/name/${student}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data); // Log the data returned from the server
  
      if (data && data.name && data.name.toLowerCase() === student.toLowerCase()) {
        setSearchedStudentName(data.name); // Set the searched student's name
        setSearchStatus("Successful");
        // alert(`Student ${data.name} found!`);
      } else {
        setSearchStatus("Student not found");
        alert("Student not found! Please check the admission number.");
      }
      
    } catch (error) {
      console.error("Error fetching student:", error);
      setSearchStatus("Error fetching student data");
      alert("An error occurred while fetching student data.");
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
    try {
      const response = await fetch("http://127.0.0.1:5555/save_marks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: studentName,
          marks: marks,
          remarks: remarks,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const result = await response.json();
      alert(result.message); // Assuming your server sends back a success message
      // Reset form fields
      setStudent("");
      setMarks({});
      setRemarks({});
      setSearchStatus("");
  
      // Redirect to Students page after saving marks
      navigate("/students");
    } catch (error) {
      console.error("Error saving marks:", error);
      alert("An error occurred while saving marks.");
    }
  };

  const totalMarks = calculateTotalMarks();
  const grade = calculateGrade(totalMarks);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleStudentClick = () => {
    alert(`Viewing profile for ${studentName}`);
  };

  const handleSubjectClick = (subject) => {
    setEditSubject(subject);
  };

  // Function to update attendance status
  const updateAttendance = (term, week, status, value) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [term]: {
        ...prevAttendance[term],
        [week]: {
          ...prevAttendance[term][week],
          [status]: Number(value),
        },
      },
    }));
  };

  // Logout handler
  const handleLogout = () => {
    navigate("/"); // Redirect to home page
  };

  // Menu item click handlers
  const navigateTo = (path) => {
    navigate(path);
    setMenuVisible(false); // Optionally close the menu after navigation
  };

  return (
    <div className="teachers-page">
      {/* Notification Pop-up */}
      {notification && <div className="notification-popup">{notification}</div>}

      <div className="sidebar1">
        <div className="menu-toggle" onClick={toggleMenu}>
          {menuVisible ? <i class="bx bx-x"></i> : <i class="bx bx-menu"></i>}
        </div>
        {menuVisible && (
          <ul>
            <li onClick={() => navigateTo("/")}>Home</li>
            <li onClick={() => navigateTo("/about")}>About</li>
            <li onClick={() => navigateTo("/teachers")}>Teachers</li>
            <li onClick={() => navigateTo("/students")}>
              Students
            </li>
            <li onClick={() => navigateTo("/attendance-report")}>
              Attendance-report
            </li>
          </ul>
        )}

        <div className="social-icons">
         <i class='bx bxl-facebook-square' ></i>
         <i class='bx bxl-twitter'></i>
         <i class='bx bxl-linkedin-square' ></i>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Welcome, {teacherName}</h1>
          <div className="logout-container" onClick={handleLogout}>
            <span className="logout-text">Logout</span>
            <i class="bx bx-log-out"></i>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            placeholder="Enter student name:"
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

        <hr />
        <h2 className="h2-attendance">ATTENDANCE</h2>
        <h3 className="year">Select Year
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </h3>
        {Object.entries(attendance).map(([term, weeks]) => (
          <div key={term} className="attendance-term">
            <h3>{term}</h3>
            {Object.entries(weeks).map(([week, { present, absent }]) => (
              <div key={week} className="attendance-week">
                <span>{week}:</span>
                <input
                  type="number"
                  value={present}
                  onChange={(e) =>
                    updateAttendance(term, week, "present", e.target.value)
                  }
                  placeholder="Present"
                />
                <input
                  type="number"
                  value={absent}
                  onChange={(e) =>
                    updateAttendance(term, week, "absent", e.target.value)
                  }
                  placeholder="Absent"
                />
              </div>
            ))}
            {/* Total present and absent counts for each term */}
            <div className="results">
              Total Present:{" "}
              {Object.values(weeks).reduce(
                (acc, { present }) => acc + present,
                0
              )}
            </div>
            <div className="results">
              Total Absent:{" "}
              {Object.values(weeks).reduce(
                (acc, { absent }) => acc + absent,
                0
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeachersPage;
