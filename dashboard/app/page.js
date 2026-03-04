"use client";

import KanbanBoard from "../components/KanbanBoard";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-6 py-6 max-w-screen-xl mx-auto w-full">
        <KanbanBoard />
      </main>
    </div>
  );
}
