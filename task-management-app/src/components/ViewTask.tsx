
import React, { useState } from 'react';
import type { Task } from './Task';
import { useUserContext } from '../contexts/UserContext';
import EditTask from './EditTask';
import styles from './ViewTask.module.css';

interface ViewTaskProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}

const ViewTask: React.FC<ViewTaskProps> = ({ task, onEdit, onDelete, onClose }) => {
  const { dispatchTasks } = useUserContext();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleStatusChange = (newStatus: Task['status']) => {
    dispatchTasks({
      type: 'UPDATE_STATUS',
      payload: [task.id, newStatus]
    });
  };

  const handlePriorityChange = (newPriority: Task['priority']) => {
    dispatchTasks({
      type: 'UPDATE_PRIORITY',
      payload: [task.id, newPriority]
    });
  };

  const handleEditTask = () => {
    setShowEditModal(true);
  };

  const handleTaskUpdated = (updatedTaskData: Partial<Task>) => {
    dispatchTasks({
      type: 'UPDATE_TASK',
      payload: { ...task, ...updatedTaskData }
    });
    setShowEditModal(false);
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
  };
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className={styles.viewTaskContainer}>
      <div className={styles.taskWindow}>
        <div className={styles.titleBar}>
          <span>📋 Task Details - ID: {task.id}</span>
          {onClose && (
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>
          )}
        </div>
        
        <div className={styles.windowContent}>
          <div className={styles.taskHeader}>
            <h2 className={styles.taskTitle}>{task.name}</h2>
            <div className={styles.taskMeta}>
              <div className={styles.statusDropdownContainer}>
                <label className={styles.statusLabel}>Status:</label>
                <select 
                  className={`${styles.statusDropdown} ${styles[task.status]}`}
                  value={task.status}
                  onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
                >
                  <option value="pending">⏳ PENDING</option>
                  <option value="in-progress">🔄 IN PROGRESS</option>
                  <option value="completed">✅ COMPLETED</option>
                  <option value="cancelled">❌ CANCELLED</option>
                  <option value="failed">💥 FAILED</option>
                </select>
              </div>
              <div className={styles.priorityDropdownContainer}>
                <label className={styles.priorityLabel}>Priority:</label>
                <select 
                  className={`${styles.priorityDropdown} ${styles[task.priority]}`}
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(e.target.value as Task['priority'])}
                >
                  <option value="low">🔵 LOW</option>
                  <option value="medium">🟡 MEDIUM</option>
                  <option value="high">🔴 HIGH</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.taskDetails}>
            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>Description</h3>
              <div className={styles.descriptionBox}>
                {task.description}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className={styles.detailSection}>
                  <h3 className={styles.sectionTitle}>Created</h3>
                  <div className={styles.dateInfo}>
                    📅 {formatDate(task.createdAt)}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.detailSection}>
                  <h3 className={styles.sectionTitle}>Last Updated</h3>
                  <div className={styles.dateInfo}>
                    🔄 {formatDate(task.updatedAt)}
                  </div>
                </div>
              </div>
            </div>

            {task.dueDate && (
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>Due Date</h3>
                <div className={styles.dueDateInfo}>
                  <span className={styles.dateInfo}>
                    ⏰ {formatDate(task.dueDate)}
                  </span>
                  {(() => {
                    const daysUntil = getDaysUntilDue(task.dueDate);
                    if (daysUntil < 0) {
                      return <span className={styles.overdue}>({Math.abs(daysUntil)} days overdue)</span>;
                    } else if (daysUntil === 0) {
                      return <span className={styles.dueToday}>(Due today!)</span>;
                    } else if (daysUntil <= 3) {
                      return <span className={styles.dueSoon}>({daysUntil} days remaining)</span>;
                    } else {
                      return <span className={styles.dueNormal}>({daysUntil} days remaining)</span>;
                    }
                  })()}
                </div>
              </div>
            )}
          </div>

          {(onEdit || onDelete) && (
            <div className={styles.actionButtons}>
              {onEdit && (
                <button className={`${styles.actionButton} ${styles.editButton}`} onClick={onEdit}>
                  ✏️ Edit Task
                </button>
              )}
              {onDelete && (
                <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={onDelete}>
                  🗑️ Delete Task
                </button>
              )}
            </div>
          )}

          {/* Edit Task Button - Always show at bottom */}
          <div className={styles.editTaskButtonContainer}>
            <button 
              className={`${styles.editTaskButton}`}
              onClick={handleEditTask}
              title="Edit this task"
            >
              ✏️ Edit Task
            </button>
          </div>
        </div>
      </div>

      {/* Edit Task Modal */}
      {showEditModal && (
        <EditTask 
          task={task}
          onTaskUpdated={handleTaskUpdated}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
};

export default ViewTask;