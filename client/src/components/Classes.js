import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Card, CardContent, CircularProgress, Button
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import LogoutIcon from '@mui/icons-material/Logout';
import './Classes.css';

const Classes = () => {
  const [classesData, setClassesData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetching classes and teachers data from the backend
  useEffect(() => {
    const fetchClassesData = async () => {
      try {
        const [classesResponse, teachersResponse] = await Promise.all([
          fetch('http://127.0.0.1:5555/get_classes'),
          fetch('http://127.0.0.1:5555/teachers')
        ]);
        const classes = await classesResponse.json();
        const teachers = await teachersResponse.json();
        setClassesData(classes);
        setTeachersData(teachers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClassesData();
  }, []);

  // Helper function to get teacher name by ID
  const getTeacherName = (teacherId) => {
    const teacher = teachersData.find((teacher) => teacher.id === teacherId);
    return teacher ? teacher.name : 'Unknown';
  };

  // Filter and sort classes based on user input
  const filteredClasses = classesData
    .filter((cls) =>
      filterBy === 'all' ? true : cls.class_capacity >= (filterBy === 'high' ? 30 : 20)
    )
    .filter((cls) =>
      cls.class_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (sortBy === 'name' ? a.class_name.localeCompare(b.class_name) : b.class_capacity - a.class_capacity));

  // Logout handler
  const handleLogout = () => {
    alert('You have logged out!');
    navigate('/');
  };

  return (
    <div className="classes-page">
      <Button
        color="inherit"
        onClick={handleLogout}
        style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '1rem', textTransform: 'none' }}
        startIcon={<LogoutIcon style={{ fontSize: '1.5rem' }} />}
      >
        Logout
      </Button>

      <Typography variant="h3" align="center" gutterBottom>
        Classes
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
                  <Typography variant="h5" gutterBottom>{cls.class_name}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Teacher: {getTeacherName(cls.teacher_id)}</Typography>
                  <Typography variant="body1" gutterBottom>Students: {cls.class_capacity}</Typography>
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