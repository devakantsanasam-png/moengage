"use client";

import { useState } from "react";
import TaskCard from "./TaskCard";
import { useTasks } from "./TaskContext";

const PRIORITIES = ["high", "medium", "low"];

export default function Column({ title, status, color, icon, tasks }) {
  const { addTask } = useTasks();
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [newTag, setNewTag] = useState("");

  function handleAdd() {
    if (!newTitle.trim()) return;
    addTask({
      title: newTitle.trim(),
      description: newDesc.trim(),
      status,
      priority: newPriority,
      tag: newTag.trim() || undefined,
    });
    setNewTitle("");
    setNewDesc("");
    setNewPriority("medium");
    setNewTag("");
    setAdding(false);
  }

  return (
    <div className="flex flex-col bg-slate-100/70 rounded-2xl border border-slate-200 min-w-0 flex-1">
      {/* Column header */}
      <div className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl ${color}`}>
        <span className="text-base">{icon}</span>
        <h2 className="font-semibold text-sm flex-1">{title}</h2>
        <span className="bg-white/60 text-xs font-bold px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-2 p-3 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {tasks.length === 0 && !adding && (
          <div className="flex flex-col items-center justify-center py-8 text-slate-400">
            <svg className="w-8 h-8 mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-xs">No tasks here</p>
          </div>
        )}

        {/* Inline add form */}
        {adding && (
          <div className="bg-white rounded-xl border border-sky-300 shadow-sm p-3 flex flex-col gap-2">
            <input
              autoFocus
              className="text-sm font-semibold border border-slate-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Task title *"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <textarea
              className="text-xs border border-slate-200 rounded-lg px-2 py-1 w-full resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
              rows={2}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Description (optional)"
            />
            <div className="flex gap-2">
              <input
                className="text-xs border border-slate-200 rounded-lg px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Tag (e.g. Dev)"
              />
              <select
                className="text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setAdding(false)}
                className="text-xs px-3 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="text-xs px-3 py-1 rounded-lg bg-sky-500 text-white hover:bg-sky-600"
              >
                Add Task
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add button */}
      {!adding && (
        <div className="p-3 pt-0">
          <button
            onClick={() => setAdding(true)}
            className="w-full text-xs text-slate-500 hover:text-slate-700 hover:bg-white rounded-xl py-2 border border-dashed border-slate-300 hover:border-slate-400 transition-all flex items-center justify-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add task
          </button>
        </div>
      )}
    </div>
  );
}
