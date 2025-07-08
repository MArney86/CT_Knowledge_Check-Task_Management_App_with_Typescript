
import React, { useState } from 'react';
import type { Task } from './Task';
import { useUserContext } from '../contexts/UserContext';
import EditTask from './EditTask';

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
    <div className="viewTaskContainer">
      <div className="taskWindow">
        <div className="titleBar">
          <span>📋 Task Details - ID: {task.id}</span>
          {onClose && (
            <button className="closeButton" onClick={onClose}>
              ✕
            </button>
          )}
        </div>
        
        <div className="windowContent padding">
          <div className="taskHeader">
            <h2 className="taskTitle">{task.name}</h2>
            <div className="taskMeta">
              <div className="statusDropdownContainer">
                <label className="statusLabel">Status:</label>
                <select 
                  className={`statusDropdown ${task.status}`}
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
              <div className="priorityDropdownContainer">
                <label className="priorityLabel">Priority:</label>
                <select 
                  className={`priorityDropdown ${task.priority}`}
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

          <div className="taskDetails">
            <div className="detailSection">
              <h3 className="sectionTitle">Description</h3>
              <div className="descriptionBox">
                {task.description}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="detailSection">
                  <h3 className="sectionTitle">Created</h3>
                  <div className="dateInfo">
                    📅 {formatDate(task.createdAt)}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="detailSection">
                  <h3 className="sectionTitle">Last Updated</h3>
                  <div className="dateInfo">
                    🔄 {formatDate(task.updatedAt)}
                  </div>
                </div>
              </div>
            </div>

            {task.dueDate && (
              <div className="detailSection">
                <h3 className="sectionTitle">Due Date</h3>
                <div className="dueDateInfo">
                  <span className="dateInfo">
                    ⏰ {formatDate(task.dueDate)}
                  </span>
                  {(() => {
                    const daysUntil = getDaysUntilDue(task.dueDate);
                    if (daysUntil < 0) {
                      return <span className="overdue">({Math.abs(daysUntil)} days overdue)</span>;
                    } else if (daysUntil === 0) {
                      return <span className="dueToday">(Due today!)</span>;
                    } else if (daysUntil <= 3) {
                      return <span className="dueSoon">({daysUntil} days remaining)</span>;
                    } else {
                      return <span className="dueNormal">({daysUntil} days remaining)</span>;
                    }
                  })()}
                </div>
              </div>
            )}
          </div>

          {(onEdit || onDelete) && (
            <div className="actionButtons">
              {onEdit && (
                <button className="actionButton editButton" onClick={onEdit}>
                  ✏️ Edit Task
                </button>
              )}
              {onDelete && (
                <button className="actionButton deleteButton" onClick={onDelete}>
                  🗑️ Delete Task
                </button>
              )}
            </div>
          )}

          {/* Edit Task Button - Always show at bottom */}
          <div className="editTaskButtonContainer">
            <button 
              className="editTaskButton"
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