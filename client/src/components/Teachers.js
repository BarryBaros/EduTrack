import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import 'boxicons'; // Ensure boxicons are installed and imported

function TeachersPage({ teacherName = "Mr John Kennedy", studentName = "Sarah James" }) {
  const [student, setStudent] = useState("");
  const [marks, setMarks] = useState({});
  const [remarks, setRemarks] = useState({});
  const [selectedClass, setSelectedClass] = useState("Form-1"); // State for selected class
  const [menuVisible, setMenuVisible] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [searchStatus, setSearchStatus] = useState("");
  const [notification, setNotification] = useState("");

  // Attendance state
  const [attendance, setAttendance] = useState({
    "First Term": {
      "January": { present: 0, absent: 0 },
      "February": { present: 0, absent: 0 },
      "March": { present: 0, absent: 0 },
    },
    "Second Term": {
      "May": { present: 0, absent: 0 },
      "June": { present: 0, absent: 0 },
      "July": { present: 0, absent: 0 },
    },
    "Third Term": {
      "September": { present: 0, absent: 0 },
      "October": { present: 0, absent: 0 },
      "November": { present: 0, absent: 0 },
    }
  });

  const subjects = ["Maths", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History"];
  const classes = ["Form-1", "Form-2", "Form-3", "Form-4"]; // List of classes

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSearch = () => {
    if (student.toLowerCase() === studentName.toLowerCase()) {
      setSearchStatus("Successful");
      alert(`Student ${studentName} found!`);
    } else {
      setSearchStatus("Student not found");
      alert("Student not found! Please check the admission number.");
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
      .filter(mark => mark !== "")
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

  const handleSave = () => {
    alert("Marks and remarks saved!");
    // Reset form fields
    setStudent("");
    setMarks({});
    setRemarks({});
    setSearchStatus("");
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
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [term]: {
        ...prevAttendance[term],
        [week]: {
          ...prevAttendance[term][week],
          [status]: Number(value)
        }
      }
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
      {notification && (
        <div className="notification-popup">
          {notification}
        </div>
      )}

      <div className="sidebar">
        <div className="menu-toggle" onClick={toggleMenu}>
          {menuVisible ? <box-icon name='x'></box-icon> : <box-icon name='menu'></box-icon>}
        </div>
        {menuVisible && (
          <ul>
            <li onClick={() => navigateTo("/")}>Home</li>
            <li onClick={() => navigateTo("/about")}>About</li>
            <li onClick={() => navigateTo("/teachers")}>Teachers</li>
            <li onClick={() => navigateTo("/students-report")}>Students Report</li>
            <li onClick={() => navigateTo("/attendance-report")}>Attendance-report</li>
          </ul>
        )}
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Welcome, {teacherName}</h1>
          <div className="logout-container" onClick={handleLogout}>
            <span className="logout-text">Logout</span>
            <box-icon name='log-out'></box-icon>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            placeholder="Enter student name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {searchStatus === "Successful" && (
          <div className="student-name"> {studentName}</div>
        )}

        <h2>Select Class</h2>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          {classes.map((className) => (
            <option key={className} value={className}>{className}</option>
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
            {subjects.map(subject => (
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
        {Object.entries(attendance).map(([term, weeks]) => (
          <div key={term} className="attendance-term">
            <h3>{term}</h3>
            {Object.entries(weeks).map(([week, { present, absent }]) => (
              <div key={week} className="attendance-week">
                <span>{week}:</span>
                <input
                  type="number"
                  value={present}
                  onChange={(e) => updateAttendance(term, week, 'present', e.target.value)}
                  placeholder="Present"
                />
                <input
                  type="number"
                  value={absent}
                  onChange={(e) => updateAttendance(term, week, 'absent', e.target.value)}
                  placeholder="Absent"
                />
              </div>
            ))}
            {/* Total present and absent counts for each term */}
            <div className="results">
              Total Present: {Object.values(weeks).reduce((acc, { present }) => acc + present, 0)}
            </div>
            <div className="results">
              Total Absent: {Object.values(weeks).reduce((acc, { absent }) => acc + absent, 0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeachersPage;
