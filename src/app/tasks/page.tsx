'use client';

import React, { useState } from 'react';
import useTasks from '../../hooks/useTasks';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import TaskList from '../../components/organisms/TaskList/TaskList';
import styles from './page.module.css';

const HomePage: React.FC = () => {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    removeCompletedTasks,
  } = useTasks();

  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName.trim()) {
      addTask(taskName);
      setTaskName('');
    }
  };

  return (
    <MainTemplate>
      <h1>To-Do List</h1>
      <section className={styles.inputSection}>
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add a new task"
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </section>
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
