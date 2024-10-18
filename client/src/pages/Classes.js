// src/pages/Classes.js
import React, { useState, useEffect } from 'react';
import './Classes.css'; // Custom CSS for advanced styling

const Classes = () => {
  const [classesData, setClassesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    // Simulating fetch request (you would replace this with a real API call)
    const fetchClassesData = () => {
      setClassesData([
        { id: 1, name: 'Mathematics', students: 30, completion: 85, teacher: 'Mr. Smith', schedule: 'Mon & Wed' },
        { id: 2, name: 'Physics', students: 25, completion: 70, teacher: 'Mrs. Johnson', schedule: 'Tue & Thu' },
        { id: 3, name: 'Chemistry', students: 20, completion: 60, teacher: 'Dr. Brown', schedule: 'Mon, Wed & Fri' },
        { id: 4, name: 'Biology', students: 28, completion: 90, teacher: 'Ms. Green', schedule: 'Tue & Fri' },
        { id: 5, name: 'History', students: 32, completion: 75, teacher: 'Dr. Grey', schedule: 'Mon & Thu' }
      ]);
    };
    fetchClassesData();
  }, []);

  // Filter and sort classes based on user input
  const filteredClasses = classesData
    .filter((cls) =>
      filterBy === 'all' ? true : cls.completion >= (filterBy === 'high' ? 80 : 60)
    )
    .filter((cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (sortBy === 'name' ? a.name.localeCompare(b.name) : b.completion - a.completion));

  return (
    <div className="classes-page">
      <h1 className="page-title">Classes Management</h1>
      <p className="page-subtitle">Efficiently manage classes and track progress here.</p>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by class name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        <div className="filter-sort">
          <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)} className="filter-select">
            <option value="all">All Classes</option>
            <option value="high">High Completion (80%+)</option>
            <option value="medium">Medium Completion (60%+)</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="name">Sort by Name</option>
            <option value="completion">Sort by Completion</option>
          </select>
        </div>
      </div>

      <div className="classes-list">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((cls) => (
            <div key={cls.id} className="class-card">
              <div className="class-header">
                <h3>{cls.name}</h3>
                <p>Teacher: {cls.teacher}</p>
                <p>Schedule: {cls.schedule}</p>
              </div>
              <div className="class-info">
                <p>Students: {cls.students}</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${cls.completion}%` }}
                  >
                    <span>{cls.completion}% Completed</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-classes">No classes found</p>
        )}
      </div>
    </div>
  );
};

export default Classes;
