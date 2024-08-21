import { useState, useCallback, useEffect } from 'react';
import { Task } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';

export interface UseTasksReturnType {
  tasks: Task[];
  addTask: (name: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, name: string) => void;
  removeCompletedTasks: () => void;
}

const fetchTasksFromLocalStorage = () => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof localStorage !== 'undefined') {
        const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
        resolve(tasks);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error as Error);
    }
  });
};

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTasksFromLocalStorage()
      .then((data) => setTasks(data as Task[]))
      .catch((err) => setError(err));
  }, []);

  if (error) {
    throw error;
  }

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
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
