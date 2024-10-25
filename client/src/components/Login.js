import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

import drop from '../assets/drop.jpg'; 

function Login({ onLogin }) {
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [staffNumber, setStaffNumber] = useState('');
    const [pinNumber, setPinNumber] = useState(''); 
    const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility
    const [role, setRole] = useState(''); // State for selected role
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const payload = {
            role,
            pinNumber,
            ...(role === 'Student' ? { admissionNumber } : { staffNumber }),
        };
        
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            
            const data = await response.json();
            if (response.ok) {
                switch(role) {
                    case 'Student':
                        navigate('/students');
                        break;
                    case 'Teacher':
                        navigate('/teachers');
                        break;
                    case 'Admin':
                        navigate('/admin/dashboard');
                        break;
                    default:
                        alert("Role not recognized.");
                }
            } else {
                alert(data.error || "Login failed");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
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
                        disabled={role === 'Teacher' || role === 'Admin'} // Disable if Teacher or Admin is selected
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
                        disabled={role === 'Student'} // Disable if Student is selected
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
