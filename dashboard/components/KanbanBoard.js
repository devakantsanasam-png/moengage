"use client";

import { useMemo, useState } from "react";
import Column from "./Column";
import { TaskProvider, useTasks } from "./TaskContext";

const COLUMNS = [
  {
    id: "todo",
    title: "To Do",
    icon: "🗂️",
    color: "bg-amber-50 text-amber-700 border-b border-amber-200",
  },
  {
    id: "inprogress",
    title: "In Progress",
    icon: "⚡",
    color: "bg-sky-50 text-sky-700 border-b border-sky-200",
  },
  {
    id: "done",
    title: "Done",
    icon: "✅",
    color: "bg-emerald-50 text-emerald-700 border-b border-emerald-200",
  },
];

function Board() {
  const { tasks } = useTasks();
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch =
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
      const matchesPriority = filterPriority === "all" || t.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, search, filterPriority]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-0 w-full sm:max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-slate-400"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Priority:</span>
          {["all", "high", "medium", "low"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                filterPriority === p
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            title={col.title}
            status={col.id}
            color={col.color}
            icon={col.icon}
            tasks={filtered.filter((t) => t.status === col.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  return (
    <TaskProvider>
      <Board />
    </TaskProvider>
  );
}
