import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';
import styles from './TaskItem.module.css';

const mockTask = {
  id: '1',
  name: 'Task 1',
  completed: false,
};

const mockToggle = jest.fn();
const mockDelete = jest.fn();
const mockEdit = jest.fn();

describe('[Molecule] TaskItem Component', () => {
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

  it('renders task name', () => {
    const taskNameElement = screen.getByText(/Task 1/i);
    expect(taskNameElement).toBeInTheDocument();
  });

  it('renders checkbox', () => {
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(mockToggle).toHaveBeenCalledWith('1');
  });

  it('renders Edit button', () => {
    const editButtonElement = screen.getByText(/Edit/i);
    expect(editButtonElement).toBeInTheDocument();
  });

  it('renders Save button when Edit button is clicked', () => {
    const editButtonElement = screen.getByText(/Edit/i);
    fireEvent.click(editButtonElement);
    const saveButtonElement = screen.getByText(/Save/i);
    expect(saveButtonElement).toBeInTheDocument();
  });

  it('calls handleEdit when Save button is clicked', () => {
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(mockEdit).toHaveBeenCalledTimes(1);
    expect(mockEdit).toHaveBeenCalledWith(mockTask.id, mockTask.name);
  });

  it('renders Delete button', () => {
    const deleteButtonElement = screen.getByText(/Delete/i);
    expect(deleteButtonElement).toBeInTheDocument();
  });

  it('calls onDelete when Delete button is clicked', () => {
    const deleteButtonElement = screen.getByText(/Delete/i);
    fireEvent.click(deleteButtonElement);
    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  it('renders Input when Edit button is clicked', () => {
    const editButtonElement = screen.getByText(/Edit/i);
    fireEvent.click(editButtonElement);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('calls handleSave when Save button is clicked', () => {
    const editButtonElement = screen.getByText(/Edit/i);
    fireEvent.click(editButtonElement);
    const saveButtonElement = screen.getByText(/Save/i);
    fireEvent.click(saveButtonElement);
    expect(mockEdit).toHaveBeenCalledWith('1', 'Task 1');
  });

  it('renders task name after saving', () => {
    const editButtonElement = screen.getByText(/Edit/i);
    fireEvent.click(editButtonElement);
    const saveButtonElement = screen.getByText(/Save/i);
    fireEvent.click(saveButtonElement);
    const taskNameElement = screen.getByText(/Task 1/i);
    expect(taskNameElement).toBeInTheDocument();
  });
});

describe('TaskItem Component - completion status', () => {
  const mockFunction = () => {};

  it('should apply the correct class name for incomplete task', () => {
    const incompleteTask = {
      id: '1',
      name: 'Incomplete Task',
      completed: false,
    };

    // Render component with incomplete task
    render(
      <TaskItem
        task={incompleteTask}
        onToggle={mockFunction}
        onDelete={mockFunction}
        onEdit={mockFunction}
      />
    );
    const incompleteTaskName = screen.getByTestId(
      `task-name-${incompleteTask.id}`
    );
    expect(incompleteTaskName).toHaveClass(styles.taskName);
    expect(incompleteTaskName).not.toHaveClass(styles.completedTask);
  });

  it('should apply the correct class name for complete task', () => {
    const completeTask = { id: '2', name: 'Complete Task', completed: true };

    // Render component with complete task
    render(
      <TaskItem
        task={completeTask}
        onToggle={mockFunction}
        onDelete={mockFunction}
        onEdit={mockFunction}
      />
    );
    const completeTaskName = screen.getByTestId(`task-name-${completeTask.id}`);
    expect(completeTaskName).toHaveClass(styles.completedTask);
    expect(completeTaskName).not.toHaveClass(styles.taskName);
  });
});
