// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import StudentTable from './components/StudentTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <Topbar />
      <div className="app-content">
        <Sidebar />
        <div className="content">
          <h1>Student Management System</h1>
          <StudentTable />
        </div>
      </div>
    </div>
  );
}

export default App;
