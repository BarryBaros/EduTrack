import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
    const navigate = useNavigate();
    const [studentResults, setStudentResults] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editMarks, setEditMarks] = useState({});
    const [menuVisible, setMenuVisible] = useState(false);
    const [teacherNames, setTeacherNames] = useState([]); // For storing teacher names
    const [selectedTeacher, setSelectedTeacher] = useState(""); // For storing selected teacher

    // Load saved student results from localStorage on component mount
    useEffect(() => {
        const storedResults = JSON.parse(localStorage.getItem("studentResults")) || [];
        setStudentResults(storedResults);
    }, []);

    // Fetch teacher names from the database
    useEffect(() => {
        const fetchTeacherNames = async () => {
            const response = await fetch("/api/teachers"); // Example endpoint
            const data = await response.json();
            setTeacherNames(data); // Assuming data is an array of teacher objects
        };

        fetchTeacherNames();
    }, []);

    // Update localStorage whenever studentResults changes
    useEffect(() => {
        localStorage.setItem("studentResults", JSON.stringify(studentResults));
    }, [studentResults]);

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this result?")) {
            const updatedResults = studentResults.filter((_, i) => i !== index);
            setStudentResults(updatedResults);
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditMarks(studentResults[index].marks);
    };

    const handleSave = (index) => {
        const total = Object.values(editMarks).reduce((sum, score) => sum + (parseInt(score) || 0), 0);
        const calculatedGrade = calculateGrade(total);
        const updatedResults = studentResults.map((result, i) =>
            i === index ? { ...result, marks: editMarks, grade: calculatedGrade } : result
        );
        setStudentResults(updatedResults);
        setEditingIndex(null); // Exit editing mode
    };

    const handleMarksChange = (subject, value) => {
        const updatedMarks = { ...editMarks, [subject]: value };
        setEditMarks(updatedMarks);
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

    const renderMarksTable = (marks, remarks, isEditing) => {
        if (!marks) return <span>No marks available</span>;

        return (
            <table className="marks-table">
                <tbody>
                    {Object.entries(marks).map(([subject, score]) => (
                        <tr key={subject}>
                            <td>{subject}</td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editMarks[subject] || ""}
                                        onChange={(e) => handleMarksChange(subject, e.target.value)}
                                    />
                                ) : (
                                    score
                                )}
                            </td>
                            <td>{remarks[subject] || "No remarks"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const handleLogout = () => {
        console.log("User logged out");
        navigate("/");
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="teachers-page">
            <div className="sidebar1">
                <div className="menu-toggle" onClick={toggleMenu}>
                    {menuVisible ? <i className="bx bx-x"></i> : <i className="bx bx-menu"></i>}
                </div>
                {menuVisible && (
                    <ul>
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/classes")}>Classes</li>
                        <li onClick={() => navigate("/teachers")}>Teachers</li>
                        <li onClick={() => navigate("/students")}>Students</li>
                        <li onClick={() => navigate("/settings")}>Settings</li>
                        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                        <li onClick={() => navigate("/attendance-report")}>Attendance-report</li>
                    </ul>
                )}
            </div>

            <div className="header1">
                <div className="logout-container1" onClick={handleLogout}>
                    <span className="logout-text1">Logout</span>
                    <i className="bx bx-log-out"></i>
                </div>
            </div>

            <div className="teacher-select">

                <select
                    id="teacher-dropdown"
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                    <option value="">-- Select Teacher --</option>
                    {teacherNames.map((teacher) => (
                        <option key={teacher.id} value={teacher.name}>
                            {teacher.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="social-icons">
         <i class='bx bxl-facebook-square' ></i>
         <i class='bx bxl-twitter'></i>
         <i class='bx bxl-linkedin-square' ></i>
        </div>

            <div>
                <h2 className="h2-attendance">Student Results</h2>
                <table  className="results-display">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Admission Number</th>
                            <th>Marks</th>
                            <th>Total Marks & Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentResults.map((result, index) => {
                            const totalMarks = editingIndex === index
                                ? Object.values(editMarks).reduce((sum, score) => sum + (parseInt(score) || 0), 0)
                                : Object.values(result.marks).reduce((sum, score) => sum + (parseInt(score) || 0), 0);

                            const grade = calculateGrade(totalMarks);

                            return (
                                <tr key={index}>
                                    <td>{result.name}</td>
                                    <td>{result.admissionNo}</td>
                                    <td>{renderMarksTable(result.marks, result.remarks, index === editingIndex)}</td>
                                    <td>{totalMarks} - {grade}</td>
                                    <td>
                                        {index === editingIndex ? (
                                            <button onClick={() => handleSave(index)}>Save</button>
                                        ) : (
                                            <button onClick={() => handleEdit(index)}>Edit</button>
                                        )}
                                        <button onClick={() => handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Results;
