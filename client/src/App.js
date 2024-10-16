
import React from 'react';
import './App.css';
import Student from './components/students'; // Import the Student component
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Student /> } />
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
