import React, { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useSelectionContext } from "../contexts/SelectionContext";
import type { Task } from "./Task";
import ListBox from "./ListBox";
import NewTask from "./NewTask";
import DeleteTask from "./DeleteTask";
import ClearTasks from "./ClearTasks";
import styles from "./TaskList.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TaskList: React.FC = () => {
    const { user, dispatchTasks } = useUserContext();
    const { selection } = useSelectionContext();
    const [showNewTask, setShowNewTask] = useState(false);
    const [showDeleteTask, setShowDeleteTask] = useState(false);
    const [showClearTasks, setShowClearTasks] = useState(false);

    // Helper functions for task management
    const getTaskById = (taskId: number) => {
        return user.tasks.tasks.find(task => task.id === taskId);
    };

    const addTask = (taskData: any) => {
        const newTask: Partial<Task> = {
            name: taskData.name || '',
            description: taskData.description || '',
            status: taskData.status || 'pending',
            priority: taskData.priority || 'medium',
            dueDate: taskData.dueDate
        };
        
        dispatchTasks({ type: 'ADD_TASK', payload: newTask as Task });
    };

    const deleteTask = (taskId: number) => {
        dispatchTasks({ type: 'REMOVE_TASK', payload: taskId });
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

    const handleClearTasks = () => {
        if (user.tasks.tasks.length > 0) {
            setShowClearTasks(true);
        }
    };

    const handleTasksCleared = () => {
        dispatchTasks({ type: 'CLEAR_TASKS' });
        setShowClearTasks(false);
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
            <Container fluid className={styles.taskListLayout}>
                <Row >
                    <Col md={10}className={styles.listBoxSection}>
                        <ListBox items={user.tasks.tasks} placeholder="Select a task" />
                    </Col>
                    <Col className={`${styles.buttonSection} d-flex flex-column align-items-center justify-content-between`}>
                        <div className={"d-flex flex-column m-0 p-0"}>
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
                    
                        <button 
                        className={`btn ${styles.actionButton} ${styles.clearButton}`}
                        onClick={handleClearTasks}
                        disabled={user.tasks.tasks.length === 0}
                        title="Clear All Tasks"
                        >
                            Clear
                        </button>
                    </Col>
                </Row>
            </Container>
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

      {showClearTasks && (
        <ClearTasks 
          taskCount={user.tasks.tasks.length}
          onConfirm={handleTasksCleared}
          onCancel={() => setShowClearTasks(false)}
        />
      )}
    </div>
  );
};

export default TaskList;