import React, { useState } from 'react';
import { Task } from '../../../types/Task';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import styles from './TaskItem.module.css';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(task.id, editedName);
    setIsEditing(false);
  };

  return (
    <div className={styles.taskItem}>
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
      {isEditing ? (
        <Input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      ) : (
        <span
          className={task.completed ? styles.completedTask : styles.taskName}
        >
          {task.name}
        </span>
      )}
      <div className={styles.actions}>
        {isEditing ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={handleEdit}>Edit</Button>
        )}
        <Button onClick={() => onDelete(task.id)}>Delete</Button>
      </div>
    </div>
  );
};

export default TaskItem;
