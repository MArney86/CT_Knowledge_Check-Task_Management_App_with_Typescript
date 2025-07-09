
import React, { useState } from 'react';
import type { Task } from './Task';
import { useUserContext } from '../contexts/UserContext';
import EditTask from './EditTask';

// Props for the ViewTask component
interface ViewTaskProps {
  task: Task;
  onClose?: () => void;
}

// ViewTask component to display task details and allow editing
const ViewTask: React.FC<ViewTaskProps> = ({ task, onClose }) => {
    //get the dispatch function from UserContext to update tasks
    const { dispatchTasks } = useUserContext();
    //state to control the visibility of the EditTask modal
    const [showEditModal, setShowEditModal] = useState(false);

    //handle status change
    const handleStatusChange = (newStatus: Task['status']) => {
        dispatchTasks({
        type: 'UPDATE_STATUS',
        payload: [task.id, newStatus]
        });
    };

    //handle priority change
    const handlePriorityChange = (newPriority: Task['priority']) => {
        dispatchTasks({
        type: 'UPDATE_PRIORITY',
        payload: [task.id, newPriority]
        });
    };

    //handle task updates from the EditTask modal
    const handleEditTask = () => {
        setShowEditModal(true);
    };

    //handle task updates from the EditTask modal
    const handleTaskUpdated = (updatedTaskData: Partial<Task>) => {
        dispatchTasks({
        type: 'UPDATE_TASK',
        payload: { ...task, ...updatedTaskData }
        });
        setShowEditModal(false);
    };

    //cancel editing and close the modal
    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    //format date to a readable string
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        }).format(date);
    };

    //calculate days until due date
    const getDaysUntilDue = (dueDate: Date) => {
        const today = new Date();
        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="viewTaskContainer">
            {/*main container for the task view in windows 98/2000 style*/}
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
                            {/*status and priority dropdowns */}
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
                    {/*task details section*/}
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
                    {/*due date section*/}
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
                        </div>)}
                </div>

                {/* Edit Task Button */}
                <div className="editTaskButtonContainer">
                    <button 
                    className="editTaskButton"
                    onClick={handleEditTask}
                    title="Edit this task">
                        ✏️ Edit Task
                    </button>
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
        </div>);
};

export default ViewTask;