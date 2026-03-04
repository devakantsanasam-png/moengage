"use client";

import { useState } from "react";
import { useTasks } from "./TaskContext";

const PRIORITY_STYLES = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-slate-100 text-slate-500",
};

const STATUS_LABELS = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const STATUS_OPTIONS = ["todo", "inprogress", "done"];

export default function TaskCard({ task }) {
  const { updateTask, deleteTask, moveTask } = useTasks();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);

  function saveEdit() {
    updateTask(task.id, { title: editTitle, description: editDesc });
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="bg-white rounded-xl border border-sky-300 shadow-sm p-3 flex flex-col gap-2">
        <input
          className="text-sm font-semibold border border-slate-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Task title"
        />
        <textarea
          className="text-xs border border-slate-200 rounded-lg px-2 py-1 w-full resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
          rows={2}
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          placeholder="Description (optional)"
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setEditing(false)}
            className="text-xs px-3 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={saveEdit}
            className="text-xs px-3 py-1 rounded-lg bg-sky-500 text-white hover:bg-sky-600"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 group hover:border-slate-300 hover:shadow transition-all">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <p className="text-sm font-semibold text-slate-800 leading-snug flex-1">{task.title}</p>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => setEditing(true)}
            className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            title="Edit"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500"
            title="Delete"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-slate-500 mb-2 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          {task.tag && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100">
              {task.tag}
            </span>
          )}
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.low}`}>
            {task.priority}
          </span>
        </div>

        <select
          value={task.status}
          onChange={(e) => moveTask(task.id, e.target.value)}
          className="text-[10px] text-slate-500 bg-transparent border border-slate-200 rounded-md px-1.5 py-0.5 cursor-pointer hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-400"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
