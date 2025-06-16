const url = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getTasks() {
  const r = await fetch(`${url}/api/tasks`);
  return r.json();
}

export async function addTask(title) {
  const r = await fetch(`${url}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  return r.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${url}/api/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
}
