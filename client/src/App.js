// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import StudentProfile from './components/StudentProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Topbar />
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <StudentProfile />
        </div>
      </div>
    </div>
  );
}

export default App;
