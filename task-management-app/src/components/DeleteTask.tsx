import React, { useState } from 'react';
import type { Task } from './Task';
import styles from './DeleteTask.module.css';

interface DeleteTaskProps {
  task: Task;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ task, onConfirm, onCancel }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      onConfirm();
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return (
      <div className={styles.overlay}>
        <div className={styles.loadingDialog}>
          <div className={styles.loadingTitle}>Deleting Task...</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.deleteDialog}>
        <div className={styles.titleBar}>
          <span>⚠️ Confirm Delete</span>
        </div>
        
        <div className={styles.dialogContent}>
          <div className={styles.warningIcon}>
            🗑️
          </div>
          
          <div className={styles.warningMessage}>
            <h3 className={styles.warningTitle}>Delete Task?</h3>
            <p className={styles.warningText}>
              Are you sure you want to delete the task:
            </p>
            <div className={styles.taskInfo}>
              <strong>"{task.name}"</strong>
            </div>
            <p className={styles.warningSubtext}>
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.actionButton} ${styles.cancelButton}`}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={handleConfirm}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
