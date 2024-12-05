import React, { useContext, useState } from "react";
import TodoContext from "../Contexts/TodoContext";
import './style.css'

export default function Todo() {
  const { tasks, setTasks, filter, setFilter } = useContext(TodoContext);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleChange = (e) => setNewTask(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  const handleDelete = (taskId) =>
    setTasks(tasks.filter((task) => task.id !== taskId));

  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEdit = (taskId, text) => {
    setEditingTaskId(taskId);
    setEditedText(text);
  };

  const handleSaveEdit = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: editedText.trim() } : task
      )
    );
    setEditingTaskId(null);
    setEditedText("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="TodoDiv">
      <h1>Todo List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleChange}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks to show!</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li  className={task.completed ? "completed" : ""}  key={task.id}>
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                </>
              ) : (
                <>
                  <span onClick={() => toggleCompletion(task.id)}>
                    {task.text}
                  </span>
                  <button onClick={() => handleEdit(task.id, task.text)}>
                    Edit
                  </button>
                </>
              )}
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}