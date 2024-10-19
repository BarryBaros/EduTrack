// src/pages/Settings.js
import React, { useState, useEffect } from 'react';
import '../components/SettingsProfile.css'; // Ensure you have a corresponding CSS file

const Settings = () => {
  // State for profile data
  const [profilePic, setProfilePic] = useState(null);
  const [studentID, setStudentID] = useState('ADM001'); // Example initial ID
  const [admissionNo, setAdmissionNo] = useState('12345678');
  const [address, setAddress] = useState('123 Main Street, City'); // Sample address

  // Load profile data from localStorage if available
  useEffect(() => {
    const storedPic = localStorage.getItem('profilePic');
    const storedID = localStorage.getItem('studentID');
    const storedAdmissionNo = localStorage.getItem('admissionNo');
    const storedAddress = localStorage.getItem('address');

    if (storedPic) setProfilePic(storedPic);
    if (storedID) setStudentID(storedID);
    if (storedAdmissionNo) setAdmissionNo(storedAdmissionNo);
    if (storedAddress) setAddress(storedAddress);
  }, []);

  // Save profile picture to localStorage
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setProfilePic(base64Image); // Set base64 image as profilePic
        localStorage.setItem('profilePic', base64Image); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  // Handlers for saving data to localStorage
  const handleStudentIDChange = (event) => {
    const newID = event.target.value;
    setStudentID(newID);
    localStorage.setItem('studentID', newID); // Save to localStorage
  };

  const handleAdmissionNoChange = (event) => {
    const newAdmissionNo = event.target.value;
    setAdmissionNo(newAdmissionNo);
    localStorage.setItem('admissionNo', newAdmissionNo); // Save to localStorage
  };

  const handleAddressChange = (event) => {
    const newAddress = event.target.value;
    setAddress(newAddress);
    localStorage.setItem('address', newAddress); // Save to localStorage
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-section">
        <div className="profile-section">
          <h2>Profile Picture</h2>
          <div className="profile-pic-container">
            <img
              src={profilePic || 'https://via.placeholder.com/150'} // Default placeholder if no image
              alt="Profile"
              className="profile-pic"
            />
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
          </div>
        </div>

        <div className="info-section">
          <h2>Student Information</h2>

          <label htmlFor="studentID">Student ID</label>
          <input
            type="text"
            id="studentID"
            value={studentID}
            onChange={handleStudentIDChange}
            disabled // Disable editing for Student ID
          />

          <label htmlFor="admissionNo">Admission Number</label>
          <input
            type="text"
            id="admissionNo"
            value={admissionNo}
            onChange={handleAdmissionNoChange}
            disabled // Disable editing for Admission Number
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
