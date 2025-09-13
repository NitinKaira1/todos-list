import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    // Load from localStorage only once, when initializing state
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse todos from localStorage:", err);
      }
    }
    return [];
  });

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: editText } : t)));
    setEditId(null);
    setEditText("");
  };

  const toggleComplete = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteCompleted = () => setTodos(todos.filter((t) => !t.completed));

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Todo List</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add new todo" />
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteCompleted}>Delete Completed</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 10,
              background: "#f9f9f9",
              padding: 8,
              borderRadius: 4
            }}
          >
            <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
            {editId === todo.id ? (
              <>
                <input value={editText} onChange={(e) => setEditText(e.target.value)} style={{ flex: 1, marginLeft: 8 }} />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1, marginLeft: 8, textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.text}
                </span>
                <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

/*
Additional features a todo list can have:
- Due dates and reminders for each todo
- Categorization or tags (e.g., Work, Personal)
- Priority levels (High, Medium, Low)
- Search/filter functionality
- Sorting (by date, priority, completed status)
- Subtasks or checklists within a todo
- Drag-and-drop reordering
- Sync with cloud or user accounts
- Dark mode/theme support
- Bulk actions (edit/delete multiple todos)
- Attachments (images, files)
- Progress tracking (e.g., percentage complete)
- Notifications for upcoming or overdue tasks
*/