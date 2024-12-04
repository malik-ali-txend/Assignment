import React, { useState, useEffect } from "react";
import TodoContext from "./TodoContext";



export default function TodoProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TodoContext.Provider value={{ tasks, setTasks, filter, setFilter }}>
      {children}
    </TodoContext.Provider>
  );
}
