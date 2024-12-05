import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css'

function App() {
  const [refreshTasks, setRefreshTasks] = useState(false);

  const handleTaskCreated = () => {
    setRefreshTasks(!refreshTasks); // Trigger re-render of TaskList
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList key={refreshTasks}  />
    </div>
  );
}

export default App;
