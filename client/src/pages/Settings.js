import React, { useState } from 'react';
import {
  Grid, Paper, Typography, TextField, Button, IconButton, Divider, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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
    company: false
  });

  // Handler for enabling editing mode
  const toggleEdit = (section) => {
    setEditing({ ...editing, [section]: true });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle save changes (mocked)
  const handleSave = (section) => {
    alert('Changes saved successfully!');
    setEditing({ ...editing, [section]: false });
  };

  // Handle cancel changes (revert to initial values)
  const handleCancel = (section) => {
    // In a real-world app, you'd retrieve original data here instead
    setEditing({ ...editing, [section]: false });
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={{ padding: '2rem' }}>
      <Grid item xs={12} sm={10} md={8}>
        <Paper elevation={3} style={{ padding: '2rem', borderRadius: '12px' }}>
          <Typography variant="h4" gutterBottom>Account Settings</Typography>
          <Divider style={{ marginBottom: '1.5rem' }} />

          {/* Account Information Section */}
          <Typography variant="h6">Account Information</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                label="User ID"
                value="ID: 9234abc..." // Static for example
                fullWidth
                disabled
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="User Email"
                value="john.doe@gmail.com" // Static for example
                fullWidth
                disabled
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Preferred Communication Language</InputLabel>
                <Select
                  name="communicationLanguage"
                  value={formData.communicationLanguage}
                  onChange={handleInputChange}
                  disabled={!editing.accountInfo}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              {!editing.accountInfo ? (
                <IconButton onClick={() => toggleEdit('accountInfo')}>
                  <EditIcon />
                </IconButton>
              ) : (
                <div>
                  <Button onClick={() => handleSave('accountInfo')} variant="contained" color="primary">Save</Button>
                  <Button onClick={() => handleCancel('accountInfo')} variant="outlined" color="secondary">Cancel</Button>
                </div>
              )}
            </Grid>
          </Grid>
          
          <Divider style={{ margin: '1.5rem 0' }} />

          {/* Personal Details Section */}
          <Typography variant="h6">Personal Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                disabled={!editing.personalDetails}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                disabled={!editing.personalDetails}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {!editing.personalDetails ? (
                <IconButton onClick={() => toggleEdit('personalDetails')}>
                  <EditIcon />
                </IconButton>
              ) : (
                <div>
                  <Button onClick={() => handleSave('personalDetails')} variant="contained" color="primary">Save</Button>
                  <Button onClick={() => handleCancel('personalDetails')} variant="outlined" color="secondary">Cancel</Button>
                </div>
              )}
            </Grid>
          </Grid>

          <Divider style={{ margin: '1.5rem 0' }} />

          {/* Address Section */}
          <Typography variant="h6">Address</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Address Line 1"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                disabled={!editing.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                disabled={!editing.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip Code"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                disabled={!editing.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {!editing.address ? (
                <IconButton onClick={() => toggleEdit('address')}>
                  <EditIcon />
                </IconButton>
              ) : (
                <div>
                  <Button onClick={() => handleSave('address')} variant="contained" color="primary">Save</Button>
                  <Button onClick={() => handleCancel('address')} variant="outlined" color="secondary">Cancel</Button>
                </div>
              )}
            </Grid>
          </Grid>

          <Divider style={{ margin: '1.5rem 0' }} />

          {/* Other sections (Company, Download Info, Delete Account) can be added similarly */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Settings;
