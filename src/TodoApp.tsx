import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';

interface Todo {
  id: number;
  task: string;
  isCompleted: boolean;
}

function TodoApp() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');

  // Charger les tâches depuis le localStorage lors du premier rendu
  useEffect(function() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const parsedTasks: Todo[] = JSON.parse(savedTasks);
      if (parsedTasks.length > 0) {
        setTasks(parsedTasks); // Ne mettre à jour que si des tâches sont présentes
      }
    }
  }, []);

  // Sauvegarder les tâches dans le localStorage à chaque mise à jour de l'état des tâches
  useEffect(function() {
    if (tasks.length > 0) { // Sauvegarder seulement si tasks n'est pas vide
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  function handleAddTask() {
    if (newTask.trim()) {
      const newTaskItem: Todo = {
        id: Date.now(),
        task: newTask,
        isCompleted: false
      };
      setTasks((prevTasks) => [...prevTasks, newTaskItem]);
      setNewTask('');
    }
  }

  function handleToggleComplete(taskId: number) {
    setTasks((prevTasks) => prevTasks.map(function(task) {
      return task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task;
    }));
  }

  function handleDeleteTask(taskId: number) {
    setTasks((prevTasks) => prevTasks.filter(function(task) {
      return task.id !== taskId;
    }));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Enter a task"
        style={{width : "300px", height : "30px", margin : "10px"}}
      />
      <button onClick={handleAddTask}>Ajouter une tâche</button>
      <div>
        {tasks.map(function(task) {
          return (
            <TodoItem
              key={task.id}
              task={task.task}
              isCompleted={task.isCompleted}
              onToggleComplete={() => handleToggleComplete(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TodoApp;
