import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

const mockTask = {
  id: '1',
  name: 'Task 1',
  completed: false,
};

const mockToggle = jest.fn();
const mockDelete = jest.fn();
const mockEdit = jest.fn();

beforeEach(() => {
  render(
    <TaskItem
      task={mockTask}
      onToggle={mockToggle}
      onDelete={mockDelete}
      onEdit={mockEdit}
    />
  );
});

test('renders task name', () => {
  const taskNameElement = screen.getByText(/Task 1/i);
  expect(taskNameElement).toBeInTheDocument();
});

test('renders checkbox', () => {
  const checkboxElement = screen.getByRole('checkbox');
  expect(checkboxElement).toBeInTheDocument();
});

test('calls onToggle when checkbox is clicked', () => {
  const checkboxElement = screen.getByRole('checkbox');
  fireEvent.click(checkboxElement);
  expect(mockToggle).toHaveBeenCalledWith('1');
});

test('renders Edit button', () => {
  const editButtonElement = screen.getByText(/Edit/i);
  expect(editButtonElement).toBeInTheDocument();
});

test('renders Save button when Edit button is clicked', () => {
  const editButtonElement = screen.getByText(/Edit/i);
  fireEvent.click(editButtonElement);
  const saveButtonElement = screen.getByText(/Save/i);
  expect(saveButtonElement).toBeInTheDocument();
});

test('calls handleEdit when Save button is clicked', () => {
  const editButton = screen.getByText('Edit');
  fireEvent.click(editButton);

  const saveButton = screen.getByText('Save');
  fireEvent.click(saveButton);

  expect(mockEdit).toHaveBeenCalledTimes(1);
  expect(mockEdit).toHaveBeenCalledWith(mockTask.id, mockTask.name);
});

test('renders Delete button', () => {
  const deleteButtonElement = screen.getByText(/Delete/i);
  expect(deleteButtonElement).toBeInTheDocument();
});

test('calls onDelete when Delete button is clicked', () => {
  const deleteButtonElement = screen.getByText(/Delete/i);
  fireEvent.click(deleteButtonElement);
  expect(mockDelete).toHaveBeenCalledWith('1');
});

test('renders Input when Edit button is clicked', () => {
  const editButtonElement = screen.getByText(/Edit/i);
  fireEvent.click(editButtonElement);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
});

test('calls handleSave when Save button is clicked', () => {
  const editButtonElement = screen.getByText(/Edit/i);
  fireEvent.click(editButtonElement);
  const saveButtonElement = screen.getByText(/Save/i);
  fireEvent.click(saveButtonElement);
  expect(mockEdit).toHaveBeenCalledWith('1', 'Task 1');
});

test('renders task name after saving', () => {
  const editButtonElement = screen.getByText(/Edit/i);
  fireEvent.click(editButtonElement);
  const saveButtonElement = screen.getByText(/Save/i);
  fireEvent.click(saveButtonElement);
  const taskNameElement = screen.getByText(/Task 1/i);
  expect(taskNameElement).toBeInTheDocument();
});
