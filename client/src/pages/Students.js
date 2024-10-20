import React, { useEffect, useState } from 'react';
import { Avatar, Typography } from '@mui/material';

const Students = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    guardian_email: ''
  });

  useEffect(() => {
    const savedProfilePic = localStorage.getItem('profilePic');
    const savedFormData = JSON.parse(localStorage.getItem('formData'));

    if (savedProfilePic) {
      setProfilePic(savedProfilePic);
    }

    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={profilePic} sx={{ width: 50, height: 50 }} />
      <div style={{ marginLeft: '1rem' }}>
        <Typography variant="h6">{formData.name}</Typography>
        <Typography variant="body2">{formData.guardian_email}</Typography>
      </div>
    </div>
  );
};

export default Students;
