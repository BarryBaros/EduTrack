import React, { useState } from 'react';
import {
  Grid, Paper, Typography, TextField, Button, IconButton, Divider, Avatar, Select, MenuItem, Snackbar, Card, CardContent
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
    communicationLanguage: 'English',
    firstName: 'John',
    lastName: 'Doe',
    address1: '123 Main St',
    address2: '',
    city: 'Springfield',
    state: '',
    zip: '12345',
    country: 'United States',
    companyName: '',
    companyAddress1: '',
    companyCity: '',
    companyState: '',
    companyZip: '',
  });

  const [editing, setEditing] = useState({
    accountInfo: false,
    personalDetails: false,
    address: false,
    company: false,
  });

  const [profilePic, setProfilePic] = useState(null); // Store profile picture
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state for feedback

  // Handle file upload for profile picture
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result); // Set base64 image as profilePic
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
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5">John Doe</Typography>
              <Typography variant="body1" color="textSecondary">john.doe@example.com</Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Account Information Section */}
        <Card elevation={3} style={{ marginBottom: '1.5rem' }}>
          <CardContent>
            <Typography variant="h6">Account Information</Typography>
            <Divider style={{ marginBottom: '1rem' }} />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="User ID"
                  value="ID: 9234abc..."
                  fullWidth
                  disabled
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="User Email"
                  value="john.doe@example.com"
                  fullWidth
                  disabled
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  label="Preferred Communication Language"
                  name="communicationLanguage"
                  value={formData.communicationLanguage}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editing.accountInfo}
                  margin="normal"
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                {!editing.accountInfo ? (
                  <IconButton onClick={() => setEditing({ ...editing, accountInfo: true })}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <div>
                    <Button
                      onClick={() => handleSave('accountInfo')}
                      startIcon={<SaveIcon />}
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => handleCancel('accountInfo')}
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

        {/* Additional Sections (e.g., Personal Details, Address, Company) can follow the same pattern */}
        {/* Snackbar for save confirmation */}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            Changes saved successfully!
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default Settings;
