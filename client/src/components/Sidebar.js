import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaUserGraduate, FaClipboardList, FaCogs } from 'react-icons/fa';

const dashboardIcon = 'https://img.icons8.com/ios-filled/50/ffffff/dashboard.png';
const addTeacherIcon = 'https://cdn-icons-png.flaticon.com/128/3373/3373452.png';
const addStudentIcon = 'https://cdn-icons-png.flaticon.com/128/3429/3429417.png';

const Sidebar = ({ isVisible }) => {
    return (
        <div className={`sidebar ${isVisible ? 'visible' : ''} w-h-full bg-green-700 text-white p-3 relative`}>
            <h2 className="text-xl font-bold mb-4">School Admin Dashboard</h2>
            <nav>
                <ul>
                    <li className="mb-2 flex items-center">
                        <img src={dashboardIcon} alt="Dashboard" className="mr-2 w-8 h-8" />
                        <NavLink to="/" className="block py-2 px-4 rounded hover:bg-blue-600" activeClassName="active-link">
                            Dashboard
                        </NavLink>
                    </li>
                    {/* <li className="mb-2 flex items-center">
                        <img src={addTeacherIcon} alt="Add Teacher" className="mr-2 w-8 h-8" />
                        <NavLink to="/admin/add-teacher" className="block py-2 px-4 rounded hover:bg-blue-600" activeClassName="active-link">
                            Add Teacher
                        </NavLink>
                    </li> */}
                    {/* <li className="mb-2 flex items-center">
                        <img src={addStudentIcon} alt="Add Student" className="mr-2 w-8 h-8" />
                        <NavLink to="/admin/add-student" className="block py-2 px-4 rounded hover:bg-blue-600" activeClassName="active-link">
                            Add Student
                        </NavLink>
                    </li> */}
                    <li className="mb-2 flex items-center">
                        <NavLink to="/students" className="nav-link block py-2 px-4 rounded hover:bg-blue-600" activeClassName="active-link">
                            <FaUserGraduate /> Students
                        </NavLink>
                    </li>
                    <li className="mb-2 flex items-center">
                        <NavLink to="/classes" className="nav-link block py-2 px-4 rounded hover:bg-blue-600" activeClassName="active-link">
                            <FaClipboardList /> Classes
                        </NavLink>
                    </li>
                    <li className="mb-2 flex items-center">
                        <NavLink to="/settings" className="nav-link block py-2 px-4 rounded hover:bg-blue-600" activeClassName="active-link">
                            <FaCogs /> Settings
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
