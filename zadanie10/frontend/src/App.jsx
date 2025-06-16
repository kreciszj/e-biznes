import { useEffect, useState } from "react";
import { addTask, getTasks, deleteTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "") return;
    const newTask = await addTask(title);
    setTasks([...tasks, { ...newTask, done: false }]);
    setTitle("");
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  }

  function toggleDone(id) {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#121212",
      fontFamily: "sans-serif",
      padding: "2rem",
      color: "#f0f0f0"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "500px",
        background: "#1e1e1e",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        textAlign: "center"
      }}>
        <h1 style={{ marginBottom: "1.5rem", color: "#ffffff" }}>TODO App</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new task"
            style={{
              flex: 1,
              padding: "0.5rem",
              fontSize: "1rem",
              border: "1px solid #333",
              borderRadius: "4px",
              backgroundColor: "#2c2c2c",
              color: "#f0f0f0"
            }}
          />
          <button type="submit" disabled={title.trim() === ""} style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: title.trim() === "" ? "#444" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: title.trim() === "" ? "not-allowed" : "pointer"
          }}>
            Add
          </button>
        </form>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{
              background: "#2a2a2a",
              padding: "0.75rem",
              borderRadius: "4px",
              marginBottom: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textDecoration: task.done ? "line-through" : "none",
              color: task.done ? "#888" : "#e0e0e0"
            }}>
              <span>{task.title}</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => toggleDone(task.id)} style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "0.25rem 0.5rem"
                }}>✔️</button>
                <button onClick={() => handleDelete(task.id)} style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "0.25rem 0.5rem"
                }}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
