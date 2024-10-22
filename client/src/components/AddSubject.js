import React, { useState, useEffect } from 'react';

const AddSubject = () => {
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState('');
    const [newSubject, setNewSubject] = useState({
        name: '',
    });

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5555/subjects');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setSubjects(data);
            } catch (error) {
                setError('Failed to fetch subjects');
                console.error("Error fetching subjects:", error);
            }
        };

        fetchSubjects();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSubject(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5555/subjects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSubject),
            });

            if (!response.ok) throw new Error('Failed to add subject');
            const addedSubject = await response.json();
            setSubjects(prev => [...prev, addedSubject]);
            setNewSubject({ name: '' });
        } catch (error) {
            setError(error.message);
            console.error("Error adding subject:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5555/subjects/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete subject');
            }

            setSubjects(prev => prev.filter(subject => subject.id !== id));
        } catch (error) {
            setError(error.message);
            console.error("Error deleting subject:", error);
        }
    };


    return (
        <div className="container mx-auto p-5">
            <h2 className="text-xl text-green-700 font-bold text-center mb-4">Add Subject</h2>
            <form onSubmit={handleSubmit} className="bg-green-100 p-4 rounded-lg shadow-lg border border-green-500 mb-4">
                <div className="flex flex-col space-y-2">
                    <input type="text" name="name" value={newSubject.name} onChange={handleChange} placeholder="Subject Name" required className="p-2 border border-gray-300 rounded text-sm" />
                    <button type="submit" className="p-2 bg-green-600 text-white rounded hover:bg-green-500 transition text-sm">Add Subject</button>
                </div>
            </form>

            <h2 className="text-xl text-green-700 font-bold text-center my-4">Subject List</h2>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <div className="overflow-x-auto rounded-lg shadow-lg border border-green-500">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-green-300">
                        <tr>
                            <th className="py-2 px-2 border-b text-left text-black">Subject Name</th>
                            <th className="py-2 px-2 border-b text-left text-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject, index) => (
                            <tr key={subject.id} className={index % 2 === 0 ? 'bg-green-50' : 'bg-white'}>
                                <td className="py-1 px-2 border-b text-black">{subject.name}</td>
                                <td className="py-1 px-2 border-b">
                                    <button
                                        onClick={() => handleDelete(subject.id)}
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

export default AddSubject;