"use client";

import { createContext, useContext, useState, useCallback } from "react";

const INITIAL_TASKS = [
  { id: "1", title: "Set up project repository", description: "Init GitHub repo, add .gitignore and README", status: "done", priority: "high", tag: "Setup" },
  { id: "2", title: "Design database schema", description: "Plan tables for users, projects, and tasks", status: "done", priority: "high", tag: "Design" },
  { id: "3", title: "Build authentication flow", description: "Implement login, signup, and session management", status: "inprogress", priority: "high", tag: "Dev" },
  { id: "4", title: "Create dashboard UI", description: "Design and implement the main dashboard layout", status: "inprogress", priority: "medium", tag: "Dev" },
  { id: "5", title: "Write API endpoints", description: "REST endpoints for tasks CRUD operations", status: "todo", priority: "medium", tag: "Dev" },
  { id: "6", title: "Add drag-and-drop", description: "Allow tasks to be dragged between columns", status: "todo", priority: "low", tag: "Feature" },
  { id: "7", title: "Write unit tests", description: "Cover core utility functions with tests", status: "todo", priority: "medium", tag: "QA" },
  { id: "8", title: "Deploy to Vercel", description: "Set up CI/CD and production deployment", status: "todo", priority: "high", tag: "Deploy" },
];

let nextId = 9;

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const addTask = useCallback((task) => {
    setTasks((prev) => [...prev, { ...task, id: String(nextId++) }]);
  }, []);

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback((id, newStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}
