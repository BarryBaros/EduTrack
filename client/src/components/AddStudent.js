import React, { useState, useEffect } from 'react';

const AddStudent = ({ fetchStudents, selectedStudent, setSelectedStudent }) => {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedStudent) {
            setName(selectedStudent.name);
            setGrade(selectedStudent.grade);
        } else {
            setName('');
            setGrade('');
        }
    }, [selectedStudent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentData = { name, grade };

        try {
            let response;
            if (selectedStudent) {
                // Update existing student
                response = await fetch(`http://localhost:5555/students/${selectedStudent.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(studentData),
                });
            } else {
                // Add new student
                response = await fetch('http://localhost:5555/students', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(studentData),
                });
            }

            if (!response.ok) {
                throw new Error('Failed to save student');
            }

            setName('');
            setGrade('');
            fetchStudents(); // Refresh the student list from AdminDashboard
            setSelectedStudent(null); // Clear selection after operation
            setError(''); // Clear any previous errors
        } catch (err) {
            setError(err.message); // Set the error message
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{selectedStudent ? 'Update Student' : 'Add Student'}</h2>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    {selectedStudent ? 'Update Student' : 'Add Student'}
                </button>
            </form>
        </div>
    );
};

export default AddStudent;
