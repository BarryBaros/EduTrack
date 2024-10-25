// src/components/Sidebarpg.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Class as ClassIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebarpg = () => {
  const [isOpen, setIsOpen] = useState(true); // State to handle sidebar open/collapse
  const navigate = useNavigate();

  // Toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Sidebar items
  const sidebarItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/student/dashboard' },
    { text: 'Students', icon: <PeopleIcon />, path: '/student/students' },
    { text: 'Classes', icon: <ClassIcon />, path: '/student/classes' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/student/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? 240 : 60,
        transition: 'width 0.3s',
        '& .MuiDrawer-paper': {
          width: isOpen ? 240 : 60,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          backgroundColor: '#2e7d32', // Green background color
          color: 'white', // White text color for contrast
        },
      }}
    >
      {/* Sidebar Title: EduTrack */}
      <div style={{ display: 'flex', justifyContent: isOpen ? 'center' : 'center', padding: '8px' }}>
        {isOpen && (
          <Typography variant="h6" noWrap style={{ color: 'white', textAlign: 'center' }}>
            EduTrack
          </Typography>
        )}
      </div>

      {/* Sidebar Toggle Button */}
      <div style={{ display: 'flex', justifyContent: isOpen ? 'flex-end' : 'center', padding: '8px' }}>
        <IconButton onClick={toggleSidebar} style={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>
      </div>

      {/* Sidebar Menu Items */}
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem button key={index} onClick={() => navigate(item.path)}>
            <ListItemIcon style={{ color: 'white' }}>{item.icon}</ListItemIcon>
            {isOpen && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebarpg;
