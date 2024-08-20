'use client';

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../types/Task';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import TaskList from '../../components/organisms/TaskList/TaskList';
import styles from './page.module.css';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskName.trim() === '') return;
    const newTask: Task = {
      id: uuidv4(),
      name: taskName,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTaskName('');
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: string, name: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, name } : task)));
  };

  const removeCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <MainTemplate>
      <h1>To-Do List</h1>
      <div className={styles.inputSection}>
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add a new task"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
      <Button onClick={removeCompletedTasks}>Remove Completed Tasks</Button>
    </MainTemplate>
  );
};

export default HomePage;
