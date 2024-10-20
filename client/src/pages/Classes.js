// src/pages/Classes.js
import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Card, CardContent, CircularProgress, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import LogoutIcon from '@mui/icons-material/Logout'; // Import the logout icon
import './Classes.css'; // Custom CSS for styling

const Classes = () => {
  const [classesData, setClassesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true); // Loading state

  // Simulated API call for fetching classes data
  useEffect(() => {
    const fetchClassesData = async () => {
      setLoading(true);
      setTimeout(() => {
        setClassesData([
          { id: 1, name: 'Mathematics', students: 30, teacher: 'Mr. Smith', schedule: 'Mon & Wed' },
          { id: 2, name: 'Physics', students: 25, teacher: 'Mrs. Johnson', schedule: 'Tue & Thu' },
          { id: 3, name: 'Chemistry', students: 20, teacher: 'Dr. Brown', schedule: 'Mon, Wed & Fri' },
          { id: 4, name: 'Biology', students: 28, teacher: 'Ms. Green', schedule: 'Tue & Fri' },
          { id: 5, name: 'History', students: 32, teacher: 'Dr. Grey', schedule: 'Mon & Thu' }
        ]);
        setLoading(false);
      }, 1000);
    };
    fetchClassesData();
  }, []);

  // Filter and sort classes based on user input
  const filteredClasses = classesData
    .filter((cls) =>
      filterBy === 'all' ? true : cls.students >= (filterBy === 'high' ? 30 : 20)
    )
    .filter((cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (sortBy === 'name' ? a.name.localeCompare(b.name) : b.students - a.students));

  // Logout handler (can be hooked to authentication logic)
  const handleLogout = () => {
    alert('You have logged out!');
    // Add your logout logic here (e.g., clearing session, redirecting to login page)
  };

  return (
    <div className="classes-page">
      {/* Logout Button with Icon and Text */}
      <Button
        color="inherit"
        onClick={handleLogout}
        style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '1rem', textTransform: 'none' }}
        startIcon={<LogoutIcon style={{ fontSize: '1.5rem' }} />} // Adding icon next to text
      >
        Logout
      </Button>

      <Typography variant="h3" align="center" gutterBottom>
        High School Classes
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Browse and manage your school’s classes.
      </Typography>

      {/* Controls Section */}
      <Grid container spacing={3} justifyContent="center" style={{ marginBottom: '1rem' }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search by Class Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon style={{ marginRight: '8px' }} />,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter by</InputLabel>
            <Select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              label="Filter by"
              startAdornment={<FilterListIcon style={{ marginRight: '8px' }} />}
            >
              <MenuItem value="all">All Classes</MenuItem>
              <MenuItem value="high">Large Classes (30+ students)</MenuItem>
              <MenuItem value="medium">Medium Classes (20+ students)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort by"
              startAdornment={<SortIcon style={{ marginRight: '8px' }} />}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="students">Student Count</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Classes List */}
      <Grid container spacing={3} justifyContent="center">
        {loading ? (
          <CircularProgress />
        ) : filteredClasses.length > 0 ? (
          filteredClasses.map((cls) => (
            <Grid item xs={12} sm={6} md={4} key={cls.id}>
              <Card className="class-card" elevation={4} sx={{ borderRadius: '12px' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>{cls.name}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Teacher: {cls.teacher}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Schedule: {cls.schedule}</Typography>
                  <Typography variant="body1" gutterBottom>Students: {cls.students}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center">No classes found.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Classes;
