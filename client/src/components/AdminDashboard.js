import React, { useState, useEffect } from 'react';
import AddTeacher from './AddTeacher';
import AddStudent from './AddStudent';
import AddSubject from './AddSubject';
import Sidebar from './Sidebar';
import AddClass from './AddClass';

const AdminDashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
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

    const fetchClasses = async () => {
        const response = await fetch('http://127.0.0.1:5555/get_classes');
        const data = await response.json();
        setClasses(data);
    };

    const fetchSubjects = async () => {
        const response = await fetch('http://127.0.0.1:5555/subjects');
        const data = await response.json();
        setClasses(data);
    };


    

    useEffect(() => {
        fetchTeachers();
        fetchStudents();
        fetchClasses();
        fetchSubjects();
    }, []);

    return (
        
        <div className="flex flex-col md:flex-row p-6">
            <Sidebar/>
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

            {/* Class Section */}
            <div className="md:w-1/2 p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-green-700 font-bold text-xl mb-4">Classes</h1>
        
                     <AddClass fetchClasses={fetchClasses} />
                
            </div>

            {/* Subject Section */}
            <div className="md:w-1/2 p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-green-700 font-bold text-xl mb-4">Subjects</h1>
        
                     <AddSubject fetchClasses={fetchSubjects} />
                
            </div>
        </div>
    );
};

export default AdminDashboard;