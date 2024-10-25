// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, CircularProgress, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios'; // For API calls

const Dashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from the backend
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('/api/student/dashboard'); // Adjust endpoint as needed
        setStudentData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <p>Loading dashboard data...</p>;
  if (error) return <p>{error}</p>;

  // Chart.js data for grades
  const gradeData = {
    labels: studentData.grades.map((grade) => grade.subject),
    datasets: [
      {
        label: 'Marks',
        data: studentData.grades.map((grade) => grade.marks),
        backgroundColor: '#3498db',
      },
    ],
  };

  return (
    <div className="main-content" style={{ flexGrow: 1, padding: '2rem', backgroundColor: '#f5f6fa' }}>
      {/* Dashboard Header */}
      <Typography variant="h3" align="center" gutterBottom>
        Student Dashboard
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Welcome to your dashboard, {studentData.name}.
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Overview Card */}
        <Grid item xs={12} sm={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: '12px' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar src={studentData.profilePic || 'https://via.placeholder.com/150'} sx={{ width: 80, height: 80 }} />
                </Grid>
                <Grid item>
                  <Typography variant="h5">{studentData.name}</Typography>
                  <Typography variant="subtitle1">Class: {studentData.class}</Typography>
                  <Typography variant="subtitle2">Admission No: {studentData.admissionNo}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Overview Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex', margin: 'auto' }}>
                <CircularProgress variant="determinate" value={studentData.attendance} size={100} thickness={4} color="primary" />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" component="div" color="textSecondary">
                    {`${studentData.attendance}%`}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="subtitle2" align="center" sx={{ marginTop: '1rem' }}>
                Great attendance!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Grades Overview Chart */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Grades Overview
              </Typography>
              <Bar
                data={gradeData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
                height={150}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ margin: '2rem 0' }} />

      {/* Upcoming Events */}
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      <List>
        {studentData.upcomingEvents.map((event, index) => (
          <ListItem key={index}>
            <ListItemText primary={event.title} secondary={event.date} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Dashboard;
