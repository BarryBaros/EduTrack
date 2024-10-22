import React, { useState, useEffect } from 'react';

const AddClass = () => {
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState('');
    const [newClass, setNewClass] = useState({
        class_name: '',
        teacher_id: '',
        class_capacity: '',
    });

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5555/get_classes');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setClasses(data);
            } catch (error) {
                setError('Failed to fetch classes');
                console.error("Error fetching classes:", error);
            }
        };

        fetchClassData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewClass(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newClass); // Log the data being sent
        try {
            const response = await fetch('http://127.0.0.1:5555/classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClass),
            });

            if (!response.ok) {
                throw new Error('Failed to add class');
            }

            const addedClass = await response.json();
            setNewClass({
                class_name: '',
                teacher_id: '',
                class_capacity: ''
            });
            setClasses(prev => [...prev, addedClass]);
        } catch (error) {
            setError(error.message);
            console.error("Error adding class:", error);
        }
    };
    const handleDelete = async (id) => {
        console.log("Deleting class with ID:", id); // Check if id is correctly passed
    
        if (!id) {
            console.error("Invalid ID:", id);
            return;
        }
    
        try {
            const response = await fetch(`http://127.0.0.1:5555/classes/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete class');
            }
    
            const data = await response.json();
            console.log(data.message || "Class deleted successfully");
    
            setClasses(prev => prev.filter(clas => clas.id !== id));
        } catch (error) {
            setError(error.message);
            console.error("Error deleting class:", error);
        }
    };
    
    


    return (
        <div className="container mx-auto p-5">
            <h2 className="text-xl text-green-700 font-bold text-center mb-4">Add Class</h2>
            <form onSubmit={handleSubmit} className="bg-green-100 p-4 rounded-lg shadow-lg border border-green-500 mb-4">
                <div className="flex flex-col space-y-2">
                    <input type="text" name="class_name" value={newClass.class_name} onChange={handleChange} placeholder="Class Name" required className="p-2 border border-gray-300 rounded text-sm" />
                    <input type="text" name="teacher_id" value={newClass.teacher_id} onChange={handleChange} placeholder="Teacher's ID" required className="p-2 border border-gray-300 rounded text-sm" />
                    <input type="text" name="class_capacity" value={newClass.class_capacity} onChange={handleChange} placeholder="Class Capacity" required className="p-2 border border-gray-300 rounded text-sm" />
                    <button type="submit" className="p-2 bg-green-600 text-white rounded hover:bg-green-500 transition text-sm">Add Class</button>
                </div>
            </form>

            <h2 className="text-xl text-green-700 font-bold text-center my-4">Class List</h2>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <div className="overflow-x-auto rounded-lg shadow-lg border border-green-500">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-green-300">
                        <tr>
                            <th className="py-2 px-2 border-b text-left text-black">Class Name</th>
                            <th className="py-2 px-2 border-b text-left text-black">Teacher's ID</th>
                            <th className="py-2 px-2 border-b text-left text-black">Class Capacity</th>
                            <th className="py-2 px-2 border-b text-left text-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    {classes.map((clas, index) => (
        <tr key={clas.id} className={index % 2 === 0 ? 'bg-green-50' : 'bg-white'}>
            <td className="py-1 px-2 border-b text-black">{clas.class_name}</td>
            <td className="py-1 px-2 border-b text-black">{clas.teacher_id}</td>
            <td className="py-1 px-2 border-b text-black">{clas.class_capacity}</td>
            <td className="py-1 px-2 border-b">
                                    <button
                                        onClick={() => handleDelete(classes.id)}
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

export default AddClass;