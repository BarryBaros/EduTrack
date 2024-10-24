import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const AddTeacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState('');
    const [newTeacher, setNewTeacher] = useState({
        staff_id: '',
        pin_no: '',
        name: ''
    });

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5555/teachers');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                setError('Failed to fetch teachers');
                console.error("Error fetching teachers:", error);
            }
        };

        fetchTeacherData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check for existing staff_id
            const existingTeacher = teachers.find(teacher => teacher.staff_id === newTeacher.staff_id);
            if (existingTeacher) {
                throw new Error('Staff ID already exists. Please use a unique Staff ID.');
            }

            const response = await fetch('http://127.0.0.1:5555/teachers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTeacher),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to add teacher: ${errorText}`);
            }

            const addedTeacher = await response.json();
            setNewTeacher({ staff_id: '', pin_no: '', name: '' });
            setTeachers(prev => [...prev, addedTeacher]);
        } catch (error) {
            setError(error.message);
            console.error("Error adding teacher:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5555/teachers/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete teacher');
            }

            setTeachers(prev => prev.filter(teacher => teacher.id !== id));
        } catch (error) {
            setError(error.message);
            console.error("Error deleting teacher:", error);
        }
    };

    
    return (
        <div className="container mx-auto p-5">
            <h2 className="text-xl text-green-700 font-bold text-center mb-4">Add Teacher</h2>
            <form onSubmit={handleSubmit} className="bg-green-100 p-4 rounded-lg shadow-lg border border-green-500 mb-4">
                <div className="flex flex-col space-y-2">
                    <input
                        type="text"
                        name="staff_id"
                        placeholder="Staff ID"
                        value={newTeacher.staff_id}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded text-sm"
                        required
                    />
                    <input
                        type="text"
                        name="pin_no"
                        placeholder="PIN Number"
                        value={newTeacher.pin_no}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded text-sm"
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newTeacher.name}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded text-sm"
                        required
                    />
                    <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-500 transition text-sm">
                        Add Teacher
                    </button>
                </div>
            </form>

            <h2 className="text-xl text-green-700 font-bold text-center my-4">Teacher List</h2>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <div className="overflow-x-auto rounded-lg shadow-lg border border-green-500">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-green-300">
                        <tr>
                            <th className="py-2 px-2 border-b text-left text-black">Staff ID</th>
                            <th className="py-2 px-2 border-b text-left text-black">Name</th>
                            <th className="py-2 px-2 border-b text-left text-black">PIN No</th>
                            <th className="py-2 px-2 border-b text-left text-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, index) => (
                            <tr key={teacher.id} className={index % 2 === 0 ? 'bg-green-50' : 'bg-white'}>
                                <td className="py-1 px-2 border-b text-black">{teacher.staff_id}</td>
                                <td className="py-1 px-2 border-b text-black">{teacher.name}</td>
                                <td className="py-1 px-2 border-b text-black">{teacher.pin_no}</td>
                                <td className="py-1 px-2 border-b">
                                    <button
                                        onClick={() => handleDelete(teacher.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddTeacher;