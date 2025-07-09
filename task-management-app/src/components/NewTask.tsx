import React, { useState } from 'react';
import TaskForm from './TaskForm';
import type { Task } from './Task';

//props for the NewTask component
interface NewTaskProps {
  onTaskCreated: (task: Partial<Task>) => void;
  onCancel: () => void;
}

//NewTask component for creating a new task
const NewTask: React.FC<NewTaskProps> = ({ onTaskCreated, onCancel }) => {
    //state to manage the submission process
    const [isSubmitting, setIsSubmitting] = useState(false);

    //handle form submission
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

    //show loading state while submitting
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
        {/*TaskForm in add mode*/}
        <TaskForm 
            onSubmit={handleSubmit}
            onCancel={onCancel}
            isEdit={false}
        />
        </div>
  );
};

export default NewTask;
