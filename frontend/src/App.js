import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Dynamically determine API URL based on environment
  const API_URL = process.env.NODE_ENV === 'production' 
    ? '/api/tasks' 
    : 'http://localhost:5000/api/tasks';

  // Fetch tasks
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, [API_URL]);

  // Handle task submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks([...tasks, newTask]);
        setInput('');
      })
      .catch(err => console.error("Error creating task:", err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <form onSubmit={handleSubmit} className="task-form">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Enter a new task..."
          />
          <button type="submit">Add Task</button>
        </form>
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              {task.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
