# Todo Application

This project is a **Todo List Application** built using **React**, **Redux**, **Tailwind CSS**, and the **React DnD** library. It features todo management with star/unstar, filtering options, drag-and-drop reordering, import/export of todos, and a dark/light theme mode. Todo data is persisted in the browser using `localStorage`.

## Table of Contents

- [View Live Demo](#view-live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## View Live Demo

👉 [Todo App](https://my-todo-app-nine-sepia.vercel.app/) 👈 😎

## Features

- Add, delete, and manage todos
- Star/unstar todos for priority marking
- Drag and drop to reorder todos (React DnD)
- Filter todos by:
  - All
  - Active
  - Completed
  - Starred
- Import and export todos as JSON files
- Persist todos and preferences using `localStorage`
- Switch between dark and light themes
- Responsive design using Tailwind CSS

## Tech Stack

- **Frontend**: React, Redux, React DnD
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **Drag and Drop**: React DnD
- **Storage**: LocalStorage

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/codename47DNS/my-todo-app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd todo-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

### Adding Todos

Enter a task in the input field and press `Enter` to add a new todo.

### Drag-and-Drop

Use the drag-and-drop functionality to reorder your tasks.

### Filtering Todos

Use the filter buttons to view all tasks, active tasks, completed tasks, or starred tasks.

### Theme Toggle

Toggle between dark and light and system modes using the theme switcher.

### Import/Export Todos

- **Export**: Click the "Export Todos" button to download your todo list as a JSON file.
- **Import**: Use the "Import Todos" button to upload a previously saved JSON file with your todos.

## Project Structure

```bash
src/
│
├── components/
│   ├── icons/ # Contains all icon components
│   ├── DataTray.tsx   # Component for importing/exporting todos
│   ├── FilterButton.tsx   # Filter button for filtering todos
│   ├── Header.tsx  # Header component
│   ├── IconButton.tsx # Icon button component
│   ├── Items.tsx   # Todo list container
│   ├── ThemeButton.tsx  # Light/dark mode toggle
│   ├── Todo.tsx # Main application
│   ├── TodoCheckbox.tsx   # Todo list item checkbox
│   ├── TodoItem.tsx  # Todo list item
│   ├── TodoItemToolbar.tsx # Wrapper of delete, star, flag and copy icons.
│   └── index.ts # Single file for all components export
│
├── store/
│   ├── todoSlice.ts # Redux slice for todo state management
│   └── store.ts      # Redux store configuration
│
└── hooks/
    └── useCopy.js # Custom hook for copy
```
