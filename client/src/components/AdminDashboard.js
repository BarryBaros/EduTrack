import React, { useState, useEffect } from 'react';
import AddTeacher from './AddTeacher';
import AddStudent from './AddStudent';
import UserList from './UserList';

const AdminDashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);

    // Function to fetch teachers
    const fetchTeachers = async () => {
        const response = await fetch('http://localhost:5555/teachers'); // Adjust the URL if needed
        const data = await response.json();
        setTeachers(data);
    };

    // Function to fetch students
    const fetchStudents = async () => {
        const response = await fetch('http://localhost:5555/students'); // Adjust the URL if needed
        const data = await response.json();
        setStudents(data);
    };

    useEffect(() => {
        fetchTeachers();
        fetchStudents();
    }, []);

    return (
        <div className="w-3/4 p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <AddTeacher fetchTeachers={fetchTeachers} />
            <AddStudent fetchStudents={fetchStudents} />

            <h2 className="text-2xl font-semibold mt-6">Teacher List</h2>
            <UserList users={teachers} userType="Teacher" />

            <h2 className="text-2xl font-semibold mt-6">Student List</h2>
            <UserList users={students} userType="Student" />
        </div>
    );
};

export default AdminDashboard;
