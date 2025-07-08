import React, { useState } from 'react';
import styles from './ClearTasks.module.css';

interface ClearTasksProps {
  taskCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const ClearTasks: React.FC<ClearTasksProps> = ({ taskCount, onConfirm, onCancel }) => {
  const [isClearing, setIsClearing] = useState(false);

  const handleConfirm = async () => {
    setIsClearing(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      onConfirm();
    } catch (error) {
      console.error('Error clearing tasks:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsClearing(false);
    }
  };

  if (isClearing) {
    return (
      <div className={styles.overlay}>
        <div className={styles.loadingDialog}>
          <div className={styles.loadingTitle}>Clearing Tasks...</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.clearDialog}>
        <div className={styles.titleBar}>
          <span>⚠️ Confirm Clear All</span>
        </div>
        
        <div className={styles.dialogContent}>
          <div className={styles.warningIcon}>
            🗑️
          </div>
          
          <div className={styles.warningMessage}>
            <h3 className={styles.warningTitle}>Clear All Tasks?</h3>
            <p className={styles.warningText}>
              Are you sure you want to clear all tasks?
            </p>
            <div className={styles.taskInfo}>
              <strong>{taskCount} task{taskCount !== 1 ? 's' : ''} will be deleted</strong>
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
            className={`${styles.actionButton} ${styles.clearButton}`}
            onClick={handleConfirm}
          >
            🗑️ Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearTasks;
