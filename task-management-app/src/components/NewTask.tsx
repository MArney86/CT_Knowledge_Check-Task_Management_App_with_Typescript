import React, { useState } from 'react';
import TaskForm from './TaskForm';
import type { Task } from './Task';
import styles from './NewTask.module.css';

interface NewTaskProps {
  onTaskCreated: (task: Partial<Task>) => void;
  onCancel: () => void;
}

const NewTask: React.FC<NewTaskProps> = ({ onTaskCreated, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (taskData: Partial<Task>) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      onTaskCreated(taskData);
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingBox}>
          <div className={styles.loadingTitle}>Creating Task...</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.newTaskContainer}>
      <TaskForm 
        onSubmit={handleSubmit}
        onCancel={onCancel}
        isEdit={false}
      />
    </div>
  );
};

export default NewTask;
