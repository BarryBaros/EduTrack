import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-1/4 bg-blue-700 text-white p-4">
            <h2 className="text-xl font-bold mb-4">School Admin Dashboard</h2>
            <nav>
                <ul>
                    <li className="mb-2">
                        <Link to="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-blue-600">Dashboard</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/admin/add-teacher" className="block py-2 px-4 rounded hover:bg-blue-600">Add Teacher</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/admin/add-student" className="block py-2 px-4 rounded hover:bg-blue-600">Add Student</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/admin/teacher-list" className="block py-2 px-4 rounded hover:bg-blue-600">Teacher List</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/admin/student-list" className="block py-2 px-4 rounded hover:bg-blue-600">Student List</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
