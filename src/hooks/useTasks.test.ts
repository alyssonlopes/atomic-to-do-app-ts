import { renderHook, act } from '@testing-library/react';
import useTasks from '../hooks/useTasks';

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a task', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('Task 1');
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].name).toBe('Task 1');
    expect(result.current.tasks[0].completed).toBe(false);
  });

  it('should toggle a task', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('Task 1');
    });

    act(() => {
      result.current.toggleTask(result.current.tasks[0].id);
    });

    expect(result.current.tasks[0].completed).toBe(true);
  });

  it('should delete a task', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('Task 1');
    });

    act(() => {
      result.current.deleteTask(result.current.tasks[0].id);
    });

    expect(result.current.tasks.length).toBe(0);
  });

  it('should edit a task', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('Task 1');
    });
    act(() => {
      result.current.addTask('Task 2');
    });

    act(() => {
      result.current.editTask(result.current.tasks[0].id, 'Updated Task');
    });

    expect(result.current.tasks[0].name).toBe('Updated Task');
  });

  it('should remove completed tasks', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('Task 1');
    });
    act(() => {
      result.current.addTask('Task 2');
    });
    act(() => {
      result.current.addTask('Task 3');
    });

    act(() => {
      result.current.toggleTask(result.current.tasks[0].id);
    });
    act(() => {
      result.current.toggleTask(result.current.tasks[2].id);
    });

    act(() => {
      result.current.removeCompletedTasks();
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].name).toBe('Task 2');
  });
});

test('should load tasks from local storage', () => {
  // Setup local storage with predefined tasks
  const tasks = [
    { id: '1', name: 'Task 1', completed: false },
    { id: '2', name: 'Task 2', completed: true },
    { id: '3', name: 'Task 3', completed: false },
  ];
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Render the hook
  const { result } = renderHook(() => useTasks());

  // Assertions
  expect(result.current.tasks.length).toBe(3);
  expect(result.current.tasks[0].name).toBe('Task 1');
  expect(result.current.tasks[0].completed).toBe(false);
  expect(result.current.tasks[1].name).toBe('Task 2');
  expect(result.current.tasks[1].completed).toBe(true);
  expect(result.current.tasks[2].name).toBe('Task 3');
  expect(result.current.tasks[2].completed).toBe(false);
});
