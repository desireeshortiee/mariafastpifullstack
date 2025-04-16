import { useState, useEffect } from "react";
import axios from "axios";
import "./../../src/index.css";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const API_URL = "https://mariabackendfastapi.onrender.com/mariatodo/";

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    axios.get(API_URL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addTask = () => {
    if (task.trim() === "") return;
    axios.post(API_URL, { title: task, completed: false })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setTask("");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const removeTask = (id) => {
    axios.delete(`${API_URL}${id}/`)
      .then(() => setTasks(tasks.filter((t) => t.id !== id)))
      .catch((error) => console.error("Error removing task:", error));
  };

  const toggleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    axios.put(`${API_URL}${id}/`, { title: task.title, completed: !task.completed })
      .then((response) => {
        setTasks(tasks.map((t) => (t.id === id ? response.data : t)));
      })
      .catch((error) => console.error("Error toggling completion:", error));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].title);
  };

  const saveEdit = (id) => {
    axios.put(`${API_URL}${id}/`, { title: editText, completed: tasks.find((t) => t.id === id).completed })
      .then((response) => {
        setTasks(tasks.map((t) => (t.id === id ? response.data : t)));
        setEditingIndex(null);
      })
      .catch((error) => console.error("Error saving task:", error));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h2>To-Do List</h2>
      <button onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Completed</button>
        <button onClick={() => setFilter("pending")} className={filter === "pending" ? "active" : ""}>Pending</button>
      </div>
      <ul>
        {filteredTasks.map((t, index) => (
          <li key={t.id} className={t.completed ? "completed" : ""}>
            {editingIndex === index ? (
              <>
                <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button onClick={() => saveEdit(t.id)}>Save</button>
              </>
            ) : (
              <>
                <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(t.id)} />
                <span>{t.title}</span>
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => removeTask(t.id)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


