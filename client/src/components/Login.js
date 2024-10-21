import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import './Login.css';
import './Login.css';

import drop from '../assets/drop.jpg'; 

function Login({ onLogin }) {
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [staffNumber, setStaffNumber] = useState('');
    const [pinNumber, setPinNumber] = useState(''); 
    const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility
    const [role, setRole] = useState(''); // State for selected role
    const navigate = useNavigate();

const handleLogin = (e) => {
    e.preventDefault();
    if ((admissionNumber || staffNumber) && pinNumber && role) {
        onLogin(admissionNumber, staffNumber, pinNumber, role);

        // Navigate to different pages based on role
        switch(role) {
            case 'Student':
                navigate('/student'); // Navigate to student page
                break;
            case 'Teacher':
                navigate('/teachers'); // Navigate to teacher page
                break;
            case 'Admin':
                navigate('/admin/dashboard'); // Navigate to admin page
                break;
            default:
                alert("Role not recognized."); // In case of an unexpected role
        }
    } else {
        alert("Please enter either an admission number or a staff number, along with your PIN and select a role.");
    }
};   

const handleDropdownClick = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
};

const handleOptionClick = (selectedRole) => {
    setRole(selectedRole); // Set the selected role
    setIsOpen(false); // Close dropdown after selection
};

return (
    <div className="my-login-container">
        <h1 className="nameh1">Account Login</h1>
        <div className="login-information">
            <p className="login-as">Login as</p>
            <img src={drop} alt="dropdown" className="dropdown}" onClick={handleDropdownClick} />
            {isOpen && (
                <div className="dropdown-options">
                    <div onClick={() => handleOptionClick('Student')}>Student</div>
                    <div onClick={() => handleOptionClick('Teacher')}>Teacher</div>
                    <div onClick={() => handleOptionClick('Admin')}>Admin</div>
                </div>
            )}
        </div>
        
        <form onSubmit={handleLogin}>
            <div className="ictioners-containers">
                <label>Admission Number:</label>
                <input
                    className="ictioner"
                    type="text"
                    value={admissionNumber}
                    onChange={(e) => setAdmissionNumber(e.target.value)}
                    placeholder="Enter admission number"
                    disabled={staffNumber}
                />
            </div>

            <div className="ictioners-containers">
                <label>Staff Number:</label>
                <input
                    className="ictioner"
                    type="text"
                    value={staffNumber}
                    onChange={(e) => setStaffNumber(e.target.value)}
                    placeholder="Enter staff number"
                    disabled={admissionNumber}
                />
            </div>

            <div className="ictioners-containers">
                <label>PIN Number</label>
                <input 
                    className="ictioner"
                    type="password" 
                    value={pinNumber}
                    onChange={(e) => setPinNumber(e.target.value)}
                    required 
                />
            </div>
            
            <button type="submit" className="login">Login</button>
        </form>
    </div>
);
};

export default Login;