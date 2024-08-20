import { useState, useCallback } from 'react';
import { Task } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = useCallback(
    (taskName: string) => {
      const newTask: Task = {
        id: uuidv4(),
        name: taskName,
        completed: false,
      };
      saveTasks([newTask, ...tasks]);
    },
    [tasks]
  );

  const toggleTask = useCallback(
    (id: string) => {
      saveTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      saveTasks(tasks.filter((task) => task.id !== id));
    },
    [tasks]
  );

  const editTask = useCallback(
    (id: string, name: string) => {
      saveTasks(
        tasks.map((task) => (task.id === id ? { ...task, name } : task))
      );
    },
    [tasks]
  );

  const removeCompletedTasks = useCallback(() => {
    saveTasks(tasks.filter((task) => !task.completed));
  }, [tasks]);

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    removeCompletedTasks,
  };
};

export default useTasks;
