import React, { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useSelectionContext } from "../contexts/SelectionContext";
import ListBox from "./ListBox";
import NewTask from "./NewTask";
import DeleteTask from "./DeleteTask";
import styles from "./TaskList.module.css";

const TaskList: React.FC = () => {
    const { user, setUser } = useUserContext();
    const { selection } = useSelectionContext();
    const [showNewTask, setShowNewTask] = useState(false);
    const [showDeleteTask, setShowDeleteTask] = useState(false);

    // Helper functions for task management
    const getTaskById = (taskId: number) => {
        return user.tasks.tasks.find(task => task.id === taskId);
    };

    const addTask = (taskData: any) => {
        const newTask = {
            id: user.tasks.tasks.length > 0 ? Math.max(...user.tasks.tasks.map(task => task.id)) + 1 : 1,
            name: taskData.name || '',
            description: taskData.description || '',
            status: taskData.status || 'pending',
            priority: taskData.priority || 'medium',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: taskData.dueDate
        };
        
        setUser({
            ...user,
            tasks: {
                tasks: [...user.tasks.tasks, newTask]
            }
        });
    };

    const deleteTask = (taskId: number) => {
        setUser({
            ...user,
            tasks: {
                tasks: user.tasks.tasks.filter(task => task.id !== taskId)
            }
        });
    };

    // Get the currently selected task
    const selectedTask = selection.selectionValue ? getTaskById(parseInt(selection.selectionValue)) : null;

    const handleAddTask = () => {
        setShowNewTask(true);
    };

    const handleViewTask = () => {
        if (selectedTask) {
            // Dispatch event to DisplayBox to show full view
            window.dispatchEvent(new CustomEvent('viewTask'));
        }
    };

    const handleDeleteTask = () => {
        if (selectedTask) {
            setShowDeleteTask(true);
        }
    };

    const handleTaskCreated = (taskData: any) => {
        addTask(taskData);
        setShowNewTask(false);
    };

    const handleTaskDeleted = () => {
        if (selectedTask) {
            deleteTask(selectedTask.id);
            setShowDeleteTask(false);
        }
    };

  return (
    <div className={styles.taskList}>
      <div className={styles.content}>
        <h2 className={styles.userTitle}>{user.name}'s Tasks</h2>
        <div className={styles.taskListLayout}>
          <div className={styles.listBoxSection}>
            <ListBox items={user.tasks.tasks} placeholder="Select a task" />
          </div>
          <div className={styles.buttonSection}>
            <button 
              className={`btn ${styles.actionButton}`}
              onClick={handleAddTask}
              title="Add New Task"
            >
              Add
            </button>
            <button 
              className={`btn ${styles.actionButton}`}
              onClick={handleViewTask}
              disabled={!selectedTask}
              title="View Selected Task"
            >
              View
            </button>
            <button 
              className={`btn ${styles.actionButton}`}
              onClick={handleDeleteTask}
              disabled={!selectedTask}
              title="Delete Selected Task"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal dialogs */}
      {showNewTask && (
        <NewTask 
          onTaskCreated={handleTaskCreated}
          onCancel={() => setShowNewTask(false)}
        />
      )}

      {showDeleteTask && selectedTask && (
        <DeleteTask 
          task={selectedTask}
          onConfirm={handleTaskDeleted}
          onCancel={() => setShowDeleteTask(false)}
        />
      )}
    </div>
  );
};

export default TaskList;