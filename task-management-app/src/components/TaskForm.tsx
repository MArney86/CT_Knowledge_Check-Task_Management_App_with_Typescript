import React, { useState } from 'react';
import type { Task } from './Task';

// Props for the TaskForm component
interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Partial<Task>) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

// TaskForm component for creating or editing tasks
const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, isEdit = false }) => {
    const [formData, setFormData] = useState({
        name: task?.name || '',
        description: task?.description || '',
        status: task?.status || 'pending' as const,
        priority: task?.priority || 'medium' as const,
        dueDate: task?.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
    });

    //state to manage form validation errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    //function to validate form inputs
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.name.trim()) {
        newErrors.name = 'Task name is required';
        }
        
        if (!formData.description.trim()) {
        newErrors.description = 'Task description is required';
        }

        if (formData.dueDate) {
        const selectedDate = new Date(formData.dueDate);
        const today = new Date();
        // Reset time to start of day for accurate comparison
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            newErrors.dueDate = 'Due date cannot be in the past';
        }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
        return;
        }

        const taskData: Partial<Task> = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
        };

        if (isEdit && task) {
        taskData.id = task.id;
        taskData.createdAt = task.createdAt;
        }

        onSubmit(taskData);
    };

    //handle input changes
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="taskForm">
            {/*form for editing/adding tasks*/}
            <div className="formTitle">
                {isEdit ? '✏️ Edit Task' : '➕ New Task'}
            </div>
            
            <form onSubmit={handleSubmit}>
                {/*form fields for task details */}
                <div className="formGroup">
                    <label className="formLabel" htmlFor="taskName">
                        Task Name:
                    </label>
                    <input
                        id="taskName"
                        type="text"
                        className={`formControl ${errors.name ? 'is-invalid' : ''}`}
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter task name"
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                
                </div>

                <div className="formGroup">
                    <label className="formLabel" htmlFor="taskDescription">
                        Description:
                    </label>
                    <textarea
                        id="taskDescription"
                        className={`formControl textArea ${errors.description ? 'is-invalid' : ''}`}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Enter task description"
                    />
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>

                <div className="row">
                    {/*status and priority fields in a row layout */}
                    <div className="col-md-6">
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="taskStatus">
                                Status:
                            </label>
                            <select id="taskStatus" className="formSelect" value={formData.status} onChange={(e) => handleInputChange('status', e.target.value)}>
                                <option value="pending">⏳ Pending</option>
                                <option value="in-progress">🔄 In Progress</option>
                                <option value="completed">✅ Completed</option>
                                <option value="cancelled">❌ Cancelled</option>
                                <option value="failed">💥 Failed</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="taskPriority">
                                Priority:
                            </label>
                            <select id="taskPriority" className="formSelect" value={formData.priority} onChange={(e) => handleInputChange('priority', e.target.value)}>
                                <option value="low" className="priorityLow">🔵 Low</option>
                                <option value="medium" className="priorityMedium">🟡 Medium</option>
                                <option value="high" className="priorityHigh">🔴 High</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/*optional due date field*/}
                <div className="formGroup">
                    <label className="formLabel" htmlFor="taskDueDate">
                        Due Date (Optional):
                    </label>
                    <input
                        id="taskDueDate"
                        type="date"
                        className={`formControl ${errors.dueDate ? 'is-invalid' : ''}`}
                        value={formData.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    />
                    {errors.dueDate && <div className="text-danger">{errors.dueDate}</div>}
                </div>

                {/*buttons for form actions*/}
                <div className="buttonGroup">
                    <button type="button" className="actionButton cancelButton"  onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="actionButton primaryButton">
                        {isEdit ? 'Update' : 'Create'} Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
