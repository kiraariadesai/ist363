import { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {

  const [todos, setTodos] = useState([
    { id: 1, task: "Complete Lab 11", completed: false },
    { id: 2, task: "Review JSX Events and State", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  function markDone(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: true } : todo
    ));
  }

  function addTask() {
    if (newTask.trim() === "") return;
    setTodos([...todos, { id: todos.length + 1, task: newTask, completed: false }]);
    setNewTask("");
  }

  return (
    <div>
      <h1>To-Do List</h1>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.task}
            </span>
            <button onClick={() => markDone(todo.id)}>X</button>
          </li>
        ))}
      </ul>

      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
