import React, { useState } from 'react';
import type { Task } from './Task';

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
      <div className="overlay">
        <div className="loadingDialog">
          <div className="loadingTitle">Deleting Task...</div>
          <div className="progressBar">
            <div className="progressFill"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay">
      <div className="deleteDialog">
        <div className="titleBar">
          <span>⚠️ Confirm Delete</span>
        </div>
        
        <div className="dialogContent">
          <div className="warningIcon">
            🗑️
          </div>
          
          <div className="warningMessage">
            <h3 className="warningTitle">Delete Task?</h3>
            <p className="warningText">
              Are you sure you want to delete the task:
            </p>
            <div className="taskInfo">
              <strong>"{task.name}"</strong>
            </div>
            <p className="warningSubtext">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="buttonGroup">
          <button 
            className="actionButton cancelButton"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="actionButton deleteButton"
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
