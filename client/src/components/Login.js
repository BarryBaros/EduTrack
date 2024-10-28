import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import drop from '../assets/drop.jpg'; 

function Login({ onLogin }) {
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [staffNumber, setStaffNumber] = useState('');
    const [pinNumber, setPinNumber] = useState(''); 
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const [teacherName, setTeacherName] = useState(''); // State for storing the teacher's name

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
                if (role === 'Teacher') {
                    setTeacherName(data.name); // Assuming the backend returns the teacher's name as 'name'
                    navigate('/teachers'); // Navigate after setting the teacher's name
                } else {
                    // Handle navigation for other roles
                    switch(role) {
                        case 'Student':
                            navigate('/student/dashboard');
                            break;
                        case 'Admin':
                            navigate('/admin/dashboard');
                            break;
                        default:
                            alert("Role not recognized.");
                    }
                }
            } else {
                alert(data.error || "Login failed");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };
    
    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (selectedRole) => {
        setRole(selectedRole);
        setIsOpen(false);
    };

    return (
        <div className="my-login-container">
            <h1 className="nameh1">Account Login</h1>
            <div className="login-information">
                <p className="login-as">Login as</p>
                <img src={drop} alt="dropdown" className="dropdown" onClick={handleDropdownClick} />
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
                        disabled={role === 'Teacher' || role === 'Admin'}
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
                        disabled={role === 'Student'}
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

            {role === 'Teacher' && teacherName && (
                <div className="welcome-message">
                    <h2>Welcome, {teacherName}!</h2> {/* Displaying teacher's name */}
                </div>
            )}
        </div>
    );
};

export default Login;
