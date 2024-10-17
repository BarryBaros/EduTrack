<<<<<<< HEAD
import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};

export default Home;
=======
import React, {useState} from "react";
import {Link, useNavigate } from "react-router-dom";
import './Login.css';


function Login({onLogin}){
    const[ admissionNumber, setAdmissionNumber] = useState('');
    const[staffNumber, setStaffNumber] = useState('');
    const[pinNumber, setPinNumber] = useState(''); 
    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();
        if(admissionNumber || staffNumber && pinNumber){
            onLogin(admissionNumber, staffNumber, pinNumber);
            navigate('/home');
        }else {
            alert("Please enter either an admission number or a staff number, along with your PIN.");
        }
    };   
    
    return(
        <div className="login-container">
                <h1>Account Login</h1>
                <p className="login-as">Login as</p>
                
                <form onSubmit={handleLogin}>
                        <div className="input-container">
                        <label>Admission Number:</label>
                        <input
                            type="text"
                            value={admissionNumber}
                            onChange={(e) => setAdmissionNumber(e.target.value)}
                            placeholder="Enter admission number"
                        />
                        </div>

                        <div className="input-container">
                          <label>Staff Number:</label>
                          <input
                            type="text"
                            value={staffNumber}
                            onChange={(e) => setStaffNumber(e.target.value)}
                            placeholder="Enter staff number"
                        />
                        </div>


                        <div className="input-container">
                            <label>PIN Number</label>
                            <input type="password" 
                            value={pinNumber}
                            onChange={(e) => setPinNumber(e.target.value)}
                            required />
                        </div>

                        <button type="submit" onClick={handleLogin}>Login</button>
                </form>

        </div>
    )
};

export default Login;
>>>>>>> 58e5de7873bebc93938c08cb6d2b95fd106a8ad6
