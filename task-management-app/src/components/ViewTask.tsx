
import React from 'react';
import type { Task } from './Task';
import styles from './ViewTask.module.css';

interface ViewTaskProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}

const ViewTask: React.FC<ViewTaskProps> = ({ task, onEdit, onDelete, onClose }) => {
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'in-progress': return '🔄';
      case 'completed': return '✅';
      case 'cancelled': return '❌';
      case 'failed': return '💥';
      default: return '❓';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return '🔵';
      case 'medium': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
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
              <span className={`${styles.statusBadge} ${styles[task.status]}`}>
                {getStatusIcon(task.status)} {task.status.replace('-', ' ').toUpperCase()}
              </span>
              <span className={`${styles.priorityBadge} ${styles[task.priority]}`}>
                {getPriorityIcon(task.priority)} {task.priority.toUpperCase()}
              </span>
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
        </div>
      </div>
    </div>
  );
};

export default ViewTask;