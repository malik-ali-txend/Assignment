import React, { useState, useEffect } from "react";
import axios from "axios";
import "./taskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedStatus, setEditedStatus] = useState("pending");

  // Fetch tasks
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) =>
        console.error("There was an error fetching tasks:", error)
      );
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) =>
        console.error("There was an error deleting the task:", error)
      );
  };

  // Handle edit click
  const handleEditClick = (task) => {
    setEditingTask(task._id); // Set the task being edited
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedStatus(task.status);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Handle save edit
  const handleSaveEdit = (id) => {
    axios
      .put(`http://localhost:5000/api/tasks/${id}`, {
        title: editedTitle,
        description: editedDescription,
        status: editedStatus,
      })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id
              ? {
                  ...task,
                  title: editedTitle,
                  description: editedDescription,
                  status: editedStatus,
                }
              : task
          )
        );
        setEditingTask(null); // Exit edit mode
      })
      .catch((error) =>
        console.error("There was an error updating the task:", error)
      );
  };

  // Function to format date
  const formatDate = (date) => {
    const taskDate = new Date(date);
    return taskDate.toLocaleString(); // Returns formatted date and time
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTask === task._id ? (
              // Edit form
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Edit Title"
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Edit Description"
                />
                <select
                  value={editedStatus}
                  onChange={(e) => setEditedStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <button onClick={() => handleSaveEdit(task._id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              // Task display
              <div>
                <p><strong>Name:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Time:</strong> {formatDate(task.createdAt)}</p> {/* Display creation date and time */}
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
