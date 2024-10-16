// components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { School, BarChart, Assignment } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <div style={{ width: 250, background: '#333', height: '100vh', color: '#fff' }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <School style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/academic-performance">
          <ListItemIcon>
            <BarChart style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Academic Performance" />
        </ListItem>
        <ListItem button component={Link} to="/attendance">
          <ListItemIcon>
            <Assignment style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
