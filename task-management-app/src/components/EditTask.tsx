import React, { useState } from 'react';
import TaskForm from './TaskForm';
import type { Task } from './Task';

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

  //show loading state while submitting
  if (isSubmitting) {
    return (
      <div className="loadingContainer">
        <div className="loadingBox">
          <div className="loadingTitle">Updating Task...</div>
          <div className="progressBar">
            <div className="progressFill"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="editTaskContainer">
        {/* Edit Task Header with Icon and Title */}
        <div className="editHeader">
            <span className="editIcon">✏️</span>
            <span className="editTitle">Editing: {task.name}</span>
        </div>
        <TaskForm task={task} onSubmit={handleSubmit} onCancel={onCancel} isEdit={true}/>
    </div>
  );
};

export default EditTask;
