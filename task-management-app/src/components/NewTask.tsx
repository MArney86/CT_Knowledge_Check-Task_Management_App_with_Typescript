import React, { useState } from 'react';
import TaskForm from './TaskForm';
import type { Task } from './Task';

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
      <div className="loadingContainer">
        <div className="loadingBox">
          <div className="loadingTitle">Creating Task...</div>
          <div className="progressBar">
            <div className="progressFill"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="newTaskContainer">
      <TaskForm 
        onSubmit={handleSubmit}
        onCancel={onCancel}
        isEdit={false}
      />
    </div>
  );
};

export default NewTask;
