import React, { useState } from 'react';
import type { Task } from './Task';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Partial<Task>) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: task?.name || '',
    description: task?.description || '',
    status: task?.status || 'pending' as const,
    priority: task?.priority || 'medium' as const,
    dueDate: task?.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className={styles.taskForm}>
      <div className={styles.formTitle}>
        {isEdit ? '✏️ Edit Task' : '➕ New Task'}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="taskName">
            Task Name:
          </label>
          <input
            id="taskName"
            type="text"
            className={`${styles.formControl} ${errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter task name"
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="taskDescription">
            Description:
          </label>
          <textarea
            id="taskDescription"
            className={`${styles.formControl} ${styles.textArea} ${errors.description ? 'is-invalid' : ''}`}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter task description"
          />
          {errors.description && <div className="text-danger">{errors.description}</div>}
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="taskStatus">
                Status:
              </label>
              <select
                id="taskStatus"
                className={styles.formSelect}
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="pending">⏳ Pending</option>
                <option value="in-progress">🔄 In Progress</option>
                <option value="completed">✅ Completed</option>
                <option value="cancelled">❌ Cancelled</option>
                <option value="failed">💥 Failed</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="taskPriority">
                Priority:
              </label>
              <select
                id="taskPriority"
                className={styles.formSelect}
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
              >
                <option value="low" className={styles.priorityLow}>🔵 Low</option>
                <option value="medium" className={styles.priorityMedium}>🟡 Medium</option>
                <option value="high" className={styles.priorityHigh}>🔴 High</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="taskDueDate">
            Due Date (Optional):
          </label>
          <input
            id="taskDueDate"
            type="date"
            className={`${styles.formControl} ${errors.dueDate ? 'is-invalid' : ''}`}
            value={formData.dueDate}
            onChange={(e) => handleInputChange('dueDate', e.target.value)}
          />
          {errors.dueDate && <div className="text-danger">{errors.dueDate}</div>}
        </div>

        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            className={`${styles.actionButton} ${styles.cancelButton}`}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className={`${styles.actionButton} ${styles.primaryButton}`}
          >
            {isEdit ? 'Update' : 'Create'} Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
