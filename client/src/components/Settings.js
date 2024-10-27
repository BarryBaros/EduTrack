import React, { useState, useEffect } from 'react';
import {
  Grid, Paper, Typography, TextField, Button, IconButton, Divider, Avatar, Snackbar, Card, CardContent
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon

const API_URL = 'http://127.0.0.1:5555/students';

// Custom Alert for Snackbar
const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Settings = () => {
  const [formData, setFormData] = useState({
    id: '', admission_no: '', name: '', DOB: '', class_id: '', address: '',
    guardian_name: '', guardian_contact: '', guardian_email: '', pin_no: '',
    general_grade: ''
  });

  const [editing, setEditing] = useState({
    personalInfo: false, address: false, guardianInfo: false,
  });

  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [removePicSnackbar, setRemovePicSnackbar] = useState(false); // Snackbar for removing picture

  // Fetch student data from the backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Assuming API returns an array of students and we want the first one
        const studentData = Array.isArray(data) ? data[0] : data;
        
        setFormData({
          id: studentData.id || '', admission_no: studentData.admission_no || '', name: studentData.name || '', DOB: studentData.DOB || '',
          class_id: studentData.class_id || '', address: studentData.address || '', guardian_name: studentData.guardian_name || '',
          guardian_contact: studentData.guardian_contact || '', guardian_email: studentData.guardian_email || '',
          pin_no: studentData.pin_no || '', general_grade: studentData.general_grade || ''
        });

        // Save to localStorage
        localStorage.setItem('formData', JSON.stringify(studentData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Load data from localStorage if needed
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('formData'));
    if (localData && !formData.id) {
      setFormData(localData);
    }
  }, [formData.id]);

  // Handle file upload for profile picture
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
        localStorage.setItem('profilePic', e.target.result);
        setOpenSnackbar(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle remove picture
  const handleRemovePicture = () => {
    setProfilePic(null);
    localStorage.removeItem('profilePic');
    setRemovePicSnackbar(true); // Show snackbar for removal
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle save changes
  const handleSave = async (section) => {
    setEditing({ ...editing, [section]: false });
    setOpenSnackbar(true);

    try {
      await fetch(`${API_URL}/${formData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      // Save updated form data to localStorage
      localStorage.setItem('formData', JSON.stringify(formData));
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // Handle cancel changes
  const handleCancel = (section) => {
    setEditing({ ...editing, [section]: false });
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={{ padding: '2rem' }}>
      <Grid item xs={12} sm={10} md={8}>
        {/* Profile Picture and Basic Info */}
        <Paper elevation={3} style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '12px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
              <Avatar src={profilePic} sx={{ width: 100, height: 100 }} />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-pic-upload"
                type="file"
                onChange={handleProfilePicChange}
              />
              <label htmlFor="profile-pic-upload">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              <IconButton onClick={handleRemovePicture} color="secondary" aria-label="remove picture">
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5">{formData.name}</Typography>
              <Typography variant="body1" color="textSecondary">Admission No: {formData.admission_no}</Typography>
              <Typography variant="body1" color="textSecondary">Class ID: {formData.class_id}</Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Personal Information Section */}
        <Card elevation={3} style={{ marginBottom: '1.5rem' }}>
          <CardContent>
            <Typography variant="h6">Student Personal Information</Typography>
            <Divider style={{ marginBottom: '1rem' }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Student ID" name="id" value={formData.id} fullWidth margin="normal" disabled />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Admission Number" name="admission_no" value={formData.admission_no} fullWidth margin="normal" disabled />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleInputChange} fullWidth disabled={!editing.personalInfo} margin="normal" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Class ID" name="class_id" value={formData.class_id} onChange={handleInputChange} fullWidth disabled={!editing.personalInfo} margin="normal" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="General Grade" name="general_grade" value={formData.general_grade} onChange={handleInputChange} fullWidth disabled={!editing.personalInfo} margin="normal" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="PIN Number" name="pin_no" value={formData.pin_no} onChange={handleInputChange} fullWidth disabled={!editing.personalInfo} margin="normal" />
              </Grid>
              <Grid item xs={12} sm={6}>
                {!editing.personalInfo ? (
                  <IconButton onClick={() => setEditing({ ...editing, personalInfo: true })}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <div>
                    <Button onClick={() => handleSave('personalInfo')} startIcon={<SaveIcon />} variant="contained" color="primary">
                      Save
                    </Button>
                    <Button onClick={() => handleCancel('personalInfo')} startIcon={<CancelIcon />} variant="outlined" color="secondary">
                      Cancel
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Address Section */}
        <Card elevation={3} style={{ marginBottom: '1.5rem' }}>
          <CardContent>
            <Typography variant="h6">Address</Typography>
            <Divider style={{ marginBottom: '1rem' }} />
            <TextField label="Address" name="address" value={formData.address} onChange={handleInputChange} fullWidth disabled={!editing.address} margin="normal" />
            {!editing.address ? (
              <IconButton onClick={() => setEditing({ ...editing, address: true })}>
                <EditIcon />
              </IconButton>
            ) : (
              <div>
                <Button onClick={() => handleSave('address')} startIcon={<SaveIcon />} variant="contained" color="primary">
                  Save
                </Button>
                <Button onClick={() => handleCancel('address')} startIcon={<CancelIcon />} variant="outlined" color="secondary">
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Guardian Information Section */}
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6">Guardian Information</Typography>
            <Divider style={{ marginBottom: '1rem' }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField label="Guardian Name" name="guardian_name" value={formData.guardian_name} onChange={handleInputChange} fullWidth disabled={!editing.guardianInfo} margin="normal" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Guardian Contact" name="guardian_contact" value={formData.guardian_contact} onChange={handleInputChange} fullWidth disabled={!editing.guardianInfo} margin="normal" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Guardian Email" name="guardian_email" value={formData.guardian_email} onChange={handleInputChange} fullWidth disabled={!editing.guardianInfo} margin="normal" />
              </Grid>
              <Grid item xs={12} sm={6}>
                {!editing.guardianInfo ? (
                  <IconButton onClick={() => setEditing({ ...editing, guardianInfo: true })}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <div>
                    <Button onClick={() => handleSave('guardianInfo')} startIcon={<SaveIcon />} variant="contained" color="primary">
                      Save
                    </Button>
                    <Button onClick={() => handleCancel('guardianInfo')} startIcon={<CancelIcon />} variant="outlined" color="secondary">
                      Cancel
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Snackbar Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Changes saved successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={removePicSnackbar} autoHideDuration={3000} onClose={() => setRemovePicSnackbar(false)}>
        <Alert onClose={() => setRemovePicSnackbar(false)} severity="info">
          Profile picture removed!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Settings;
