import React, { useState, useEffect } from 'react';
import {
  Grid, Paper, Typography, TextField, Button, IconButton, Divider, Avatar, Snackbar, Card, CardContent
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MuiAlert from '@mui/material/Alert';

// Custom Alert for Snackbar
const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Settings = () => {
  const [formData, setFormData] = useState({
    id: 'S123456', // Non-editable field
    admission_no: 'A123456', // Non-editable field
    name: 'John Doe',
    pin_no_hash: 'hashedpin1234',
    DOB: '2005-01-01',
    class_id: 'Grade 10',
    address: '123 Main St, Springfield',
    guardian_name: 'Jane Doe',
    guardian_contact: '555-1234',
    guardian_email: 'jane.doe@example.com',
  });

  const [editing, setEditing] = useState({
    personalInfo: false,
    address: false,
    guardianInfo: false,
  });

  const [profilePic, setProfilePic] = useState(null); // Store profile picture
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state for feedback

  // Load saved profile info from localStorage on component mount
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

  // Handle file upload for profile picture
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result); // Set base64 image as profilePic
        localStorage.setItem('profilePic', e.target.result); // Save to localStorage
        setOpenSnackbar(true); // Show success message
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle save changes
  const handleSave = (section) => {
    setOpenSnackbar(true); // Show success snackbar
    setEditing({ ...editing, [section]: false });

    // Save form data to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
  };

  // Handle cancel changes
  const handleCancel = (section) => {
    setEditing({ ...editing, [section]: false });
  };

  // Handle removing profile picture
  const handleRemoveProfilePic = () => {
    setProfilePic(null);
    localStorage.removeItem('profilePic'); // Remove from localStorage
    setOpenSnackbar(true); // Show success message
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

              {/* Save and Remove Buttons for Profile Picture */}
              {profilePic && (
                <>
                  <Button
                    onClick={handleRemoveProfilePic}
                    variant="outlined"
                    color="secondary"
                    style={{ marginTop: '1rem' }}
                  >
                    Remove Picture
                  </Button>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5">{formData.name}</Typography>
              <Typography variant="body1" color="textSecondary">{formData.guardian_email}</Typography>
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
                <TextField
                  label="Student ID"
                  name="id"
                  value={formData.id}
                  fullWidth
                  margin="normal"
                  disabled // Non-editable
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Admission Number"
                  name="admission_no"
                  value={formData.admission_no}
                  fullWidth
                  margin="normal"
                  disabled // Non-editable
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  name="DOB"
                  type="date"
                  value={formData.DOB}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editing.personalInfo}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Class ID"
                  name="class_id"
                  value={formData.class_id}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editing.personalInfo}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {!editing.personalInfo ? (
                  <IconButton onClick={() => setEditing({ ...editing, personalInfo: true })}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <div>
                    <Button
                      onClick={() => handleSave('personalInfo')}
                      startIcon={<SaveIcon />}
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => handleCancel('personalInfo')}
                      startIcon={<CancelIcon />}
                      variant="outlined"
                      color="secondary"
                    >
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editing.address}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {!editing.address ? (
                  <IconButton onClick={() => setEditing({ ...editing, address: true })}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <div>
                    <Button
                      onClick={() => handleSave('address')}
                      startIcon={<SaveIcon />}
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => handleCancel('address')}
                      startIcon={<CancelIcon />}
                      variant="outlined"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Guardian Information Section */}
        <Card elevation={3} style={{ marginBottom: '1.5rem' }}>
          <CardContent>
            <Typography variant="h6">Guardian Information</Typography>
            <Divider style={{ marginBottom: '1rem' }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Guardian Name"
                  name="guardian_name"
                  value={formData.guardian_name}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editing.guardianInfo}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Guardian Contact"
                  name="guardian_contact"
                  value={formData.guardian_contact}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editing.guardianInfo}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Guardian Email"
                  name="guardian_email"
                  value={formData.guardian_email}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editing.guardianInfo}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {!editing.guardianInfo ? (
                  <IconButton onClick={() => setEditing({ ...editing, guardianInfo: true })}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <div>
                    <Button
                      onClick={() => handleSave('guardianInfo')}
                      startIcon={<SaveIcon />}
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => handleCancel('guardianInfo')}
                      startIcon={<CancelIcon />}
                      variant="outlined"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Snackbar Notification */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            Changes saved successfully!
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default Settings;