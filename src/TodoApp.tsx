import React, { useState } from 'react';
import TodoItem from './components/TodoItem';

interface Todo {
  id: number;
  task: string;
  isCompleted: boolean;
}

function TodoApp() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');

  function handleAddTask() {
    if (newTask.trim()) {
      const newTaskItem: Todo = {
        id: Date.now(),
        task: newTask,
        isCompleted: false
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  }

  function handleToggleComplete(taskId: number) {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  return (
    <div>
      <h1>Ma liste des tâches</h1>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Entrer une tâche"
        style={{width : "300px", height : "30px"}}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <div>
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task.task}
            isCompleted={task.isCompleted}
            onToggleComplete={() => handleToggleComplete(task.id)}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
