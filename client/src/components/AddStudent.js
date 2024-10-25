import React, { useState, useEffect } from 'react';

const AddStudent = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [newStudent, setNewStudent] = useState({
        admission_no: '',
        name: '',
        pin_no: '',
        DOB: '', // Changed 'dob' to 'DOB'
        class_id: '',
        general_grade: '',
        guardian_name: '',
        guardian_contact: '',
        guardian_email: ''
    });

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5555/students');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                setError('Failed to fetch students');
                console.error("Error fetching students:", error);
            }
        };

        fetchStudentData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newStudent); // Log the data being sent
        try {
            const response = await fetch('http://127.0.0.1:5555/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            });

            if (!response.ok) {
                throw new Error('Failed to add student');
            }

            const addedStudent = await response.json();
            setNewStudent({
                admission_no: '',
                name: '',
                pin_no: '',
                DOB: '', // Reset DOB
                class_id: '',
                general_grade: '',
                guardian_name: '',
                guardian_contact: '',
                guardian_email: ''
            });
            setStudents(prev => [...prev, addedStudent]);
        } catch (error) {
            setError(error.message);
            console.error("Error adding student:", error);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-xl text-green-700 font-bold text-center mb-4">Add Student</h2>
            <form onSubmit={handleSubmit} className="bg-green-100 p-4 rounded-lg shadow-lg border border-green-500 mb-4">
                <div className="flex flex-col space-y-2">
                    <input type="text" name="admission_no" value={newStudent.admission_no} onChange={handleChange} placeholder="Admission No" required className="p-2 border border-gray-300 rounded text-sm" />
                    <input type="text" name="name" value={newStudent.name} onChange={handleChange} placeholder="Name" required className="p-2 border border-gray-300 rounded text-sm" />
                    <input type="text" name="pin_no" value={newStudent.pin_no} onChange={handleChange} placeholder="PIN No" required className="p-2 border border-gray-300 rounded text-sm" />
                    <input type="date" name="DOB" value={newStudent.DOB} onChange={handleChange} required className="p-2 border border-gray-300 rounded text-sm" />
                    <input type="text" name="class_id" value={newStudent.class_id} onChange={handleChange} placeholder="Class ID" required className="p-2 border border-gray-300 rounded text-sm" />
                    <input type="text" name="general_grade" value={newStudent.general_grade} onChange={handleChange} placeholder="General Grade" required className="p-2 border border-gray-300 rounded text-sm" />
                    <input type="text" name="guardian_name" value={newStudent.guardian_name} onChange={handleChange} placeholder="Guardian Name" required className="p-2 border border-gray-300 rounded text-sm" />
                    <input type="text" name="guardian_contact" value={newStudent.guardian_contact} onChange={handleChange} placeholder="Guardian Contact" required className="p-2 border border-gray-300 rounded text-sm" />
                    <input type="email" name="guardian_email" value={newStudent.guardian_email} onChange={handleChange} placeholder="Guardian Email" required className="p-2 border border-gray-300 rounded text-sm" />
                    <button type="submit" className="p-2 bg-green-600 text-white rounded hover:bg-green-500 transition text-sm">Add Student</button>
                </div>
            </form>

            <h2 className="text-xl text-green-700 font-bold text-center my-4">Student List</h2>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <div className="overflow-x-auto rounded-lg shadow-lg border border-green-500">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-green-300">
                        <tr>
                            <th className="py-2 px-2 border-b text-left text-black">Admission No</th>
                            <th className="py-2 px-2 border-b text-left text-black">Name</th>
                            <th className="py-2 px-2 border-b text-left text-black">PIN No</th>
                            <th className="py-2 px-2 border-b text-left text-black">DOB</th>
                            <th className="py-2 px-2 border-b text-left text-black">Class ID</th>
                            <th className="py-2 px-2 border-b text-left text-black">General Grade</th>
                            <th className="py-2 px-2 border-b text-left text-black">Guardian Name</th>
                            <th className="py-2 px-2 border-b text-left text-black">Guardian Contact</th>
                            <th className="py-2 px-2 border-b text-left text-black">Guardian Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id} className={index % 2 === 0 ? 'bg-green-50' : 'bg-white'}>
                                <td className="py-1 px-2 border-b text-black">{student.admission_no}</td>
                                <td className="py-1 px-2 border-b text-black">{student.name}</td>
                                <td className="py-1 px-2 border-b text-black">{student.pin_no}</td>
                                <td className="py-1 px-2 border-b text-black">{new Date(student.DOB).toLocaleDateString()}</td>
                                <td className="py-1 px-2 border-b text-black">{student.class_id}</td>
                                <td className="py-1 px-2 border-b text-black">{student.general_grade}</td>
                                <td className="py-1 px-2 border-b text-black">{student.guardian_name}</td>
                                <td className="py-1 px-2 border-b text-black">{student.guardian_contact}</td>
                                <td className="py-1 px-2 border-b text-black">{student.guardian_email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddStudent;