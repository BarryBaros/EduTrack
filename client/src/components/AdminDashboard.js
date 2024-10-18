import React, { useState, useEffect } from 'react';
import AddTeacher from './AddTeacher';
import AddStudent from './AddStudent';

const AdminDashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const fetchTeachers = async () => {
        const response = await fetch('http://127.0.0.1:5555/teachers');
        const data = await response.json();
        setTeachers(data);
    };

    const fetchStudents = async () => {
        const response = await fetch('http://127.0.0.1:5555/students');
        const data = await response.json();
        setStudents(data);
    };

    useEffect(() => {
        fetchTeachers();
        fetchStudents();
    }, []);

    return (
        <div className="flex flex-col md:flex-row p-6">
            {/* Teachers Section */}
            <div className="md:w-1/2 p-4 bg-white rounded-lg shadow-md mb-4 md:mb-0 md:mr-2">
                <h1 className="text-green-700 font-bold text-xl mb-4">Teachers</h1>
                <AddTeacher fetchTeachers={fetchTeachers} />
            </div>
            
            {/* Students Section */}
            <div className="md:w-1/2 p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-green-700 font-bold text-xl mb-4">Students</h1>
                <AddStudent 
                    fetchStudents={fetchStudents} 
                    selectedStudent={selectedStudent} 
                    setSelectedStudent={setSelectedStudent} 
                    students={students} 
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
