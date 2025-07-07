import React, { useState } from 'react';
import TaskForm from './TaskForm';
import type { Task } from './Task';
import styles from './EditTask.module.css';

interface EditTaskProps {
  task: Task;
  onTaskUpdated: (task: Partial<Task>) => void;
  onCancel: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onTaskUpdated, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (taskData: Partial<Task>) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      onTaskUpdated(taskData);
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingBox}>
          <div className={styles.loadingTitle}>Updating Task...</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.editTaskContainer}>
      <div className={styles.editHeader}>
        <span className={styles.editIcon}>✏️</span>
        <span className={styles.editTitle}>Editing: {task.name}</span>
      </div>
      <TaskForm 
        task={task}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        isEdit={true}
      />
    </div>
  );
};

export default EditTask;
