import React, { useState } from 'react';

const AddTeacher = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Teacher Added:', { name, email });
        // Add logic to save teacher data
    };

    return (
        <div className="p-6 bg-black rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add Teacher</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-black-300 p-2 mb-4 w-full"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-black-300 p-2 mb-4 w-full"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Add Teacher
                </button>
            </form>
        </div>
    );
};

export default AddTeacher;
