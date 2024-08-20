import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

const mockTasks = [
  { id: '1', name: 'Task 1', completed: false },
  { id: '2', name: 'Task 2', completed: true },
  { id: '3', name: 'Task 3', completed: false },
];

test('renders an empty task list', () => {
  render(
    <TaskList
      tasks={[]}
      onToggle={jest.fn()}
      onDelete={jest.fn()}
      onEdit={jest.fn()}
    />
  );

  const taskItems = screen.queryAllByTestId('task-item');
  expect(taskItems).toHaveLength(0);
});

test('renders the list of tasks', () => {
  render(
    <TaskList
      tasks={mockTasks}
      onToggle={jest.fn()}
      onDelete={jest.fn()}
      onEdit={jest.fn()}
    />
  );

  const taskItems = screen.getAllByTestId('task-item');
  expect(taskItems).toHaveLength(mockTasks.length);
});

test('calls onToggle when a task is toggled', () => {
  const handleToggle = jest.fn();
  render(
    <TaskList
      tasks={mockTasks}
      onToggle={handleToggle}
      onDelete={jest.fn()}
      onEdit={jest.fn()}
    />
  );

  const taskCheckbox = screen.getByTestId(`checkbox-${mockTasks[0].id}`);

  fireEvent.click(taskCheckbox);

  expect(handleToggle).toHaveBeenCalledTimes(1);
  expect(handleToggle).toHaveBeenCalledWith(mockTasks[0].id);
});

test('calls onDelete when a task is deleted', () => {
  const handleDelete = jest.fn();
  render(
    <TaskList
      tasks={mockTasks}
      onToggle={jest.fn()}
      onDelete={handleDelete}
      onEdit={jest.fn()}
    />
  );

  const deleteButton = screen.getByTestId(`btn-delete-${mockTasks[1].id}`);
  fireEvent.click(deleteButton);

  expect(handleDelete).toHaveBeenCalledTimes(1);
  expect(handleDelete).toHaveBeenCalledWith(mockTasks[1].id);
});

test('calls onEdit when a task is edited', () => {
  const handleEdit = jest.fn();
  render(
    <TaskList
      tasks={mockTasks}
      onToggle={jest.fn()}
      onDelete={jest.fn()}
      onEdit={handleEdit}
    />
  );

  const editButton = screen.getByTestId(`btn-edit-${mockTasks[2].id}`);
  fireEvent.click(editButton);

  const saveButton = screen.getByTestId(`btn-save-${mockTasks[2].id}`);
  fireEvent.click(saveButton);

  expect(handleEdit).toHaveBeenCalledTimes(1);
  expect(handleEdit).toHaveBeenCalledWith(mockTasks[2].id, mockTasks[2].name);
});
