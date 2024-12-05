// src/components/TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './taskForm.css'


const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        title,
        description,
        status: 'pending',
      });
      onTaskCreated(response.data); // Notify parent of the new task
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      console.error('Error creating task:', err.message);
      setError('Failed to create task. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add a New Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
