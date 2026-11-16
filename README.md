# Task Manager App

A simple task manager built with React. Add tasks with a priority and due date, edit them, and have everything saved in your browser so it survives a reload. Includes a light/dark theme toggle.

**Live demo:** _add your Vercel link here_

## Features

- Add tasks with a title, priority (High, Medium, Low) and due date
- Edit existing tasks
- Tasks are sorted automatically: High, then Medium, then Low priority, and by due date within each group
- Tasks without a due date are handled safely
- Starter tasks are loaded from `public/tasks.json` on the first visit
- Data persists in `localStorage`, so your tasks stay after a refresh
- Loading spinner while data loads, with an error message and a **Retry** button if loading fails
- Light and dark theme toggle (your choice is remembered)

## Tech Stack

- React (hooks: `useState`, `useEffect`)
- Vite
- CSS
- Deployed on Vercel

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/kabirlimje/task-manager-app.git
cd task-manager-app
npm install
```

### Run locally

```bash
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
task-manager-app/
├── public/
│   └── tasks.json          # Starter tasks loaded on the first visit
├── src/
│   ├── components/
│   │   ├── TaskAdder.jsx   # Form to add a new task
│   │   └── TaskList.jsx    # Displays and edits the tasks
│   ├── App.jsx             # Main component: state, fetching, sorting, theme
│   ├── App.css             # Styles
│   └── main.jsx            # App entry point
└── package.json
```

## How It Works

1. On load, the app checks `localStorage` for saved tasks.
2. If none are found, it fetches the starter tasks from `tasks.json`.
3. Every time the task list changes, it is sorted by priority and due date, then saved back to `localStorage`.
4. The theme is stored in `localStorage` and applied through a `data-theme` attribute on the page.

## Resetting the Data

To clear your saved tasks and reload the starter data, open the browser console and run:

```js
localStorage.removeItem("tasks")
```

Then refresh the page.

## Deployment

The project is deployed on Vercel. Every push to the `main` branch triggers a new deployment automatically.

## Author

Kabir Limje
