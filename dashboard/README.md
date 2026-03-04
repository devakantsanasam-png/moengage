# My Dashboard

A personal Kanban-style project management dashboard built with **Next.js 14** and **Tailwind CSS**, ready to deploy on Vercel.

## 🚀 Deploy to Vercel (3 steps)

### Option A — Deploy via GitHub (recommended)
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Click **Deploy** — Vercel auto-detects Next.js, no config needed

### Option B — Deploy via Vercel CLI
```bash
npm install -g vercel
cd my-dashboard
npm install
vercel
```

---

## 💻 Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✨ Features

- **Kanban board** with To Do / In Progress / Done columns
- **Add, edit, delete** tasks inline
- **Move tasks** between columns via dropdown
- **Filter** by priority (High / Medium / Low)
- **Search** tasks by title or description
- **Stats bar** showing live task counts and completion rate
- Fully **responsive** (mobile-friendly)

---

## 🛠️ Customise

- Edit `components/TaskContext.js` to change the initial sample tasks
- Edit `app/layout.js` to change the page title
- Edit `components/Header.js` to change the dashboard name
- Add new pages in the `app/` folder using Next.js App Router
