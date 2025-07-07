import { useSelectionContext } from "../contexts/SelectionContext";
import { useUserContext } from "../contexts/UserContext";
import { useState, useEffect } from "react";
import ViewTask from "./ViewTask";
import styles from "./DisplayBox.module.css";

export default function DisplayBox() {
    const { user } = useUserContext();
    const { selection } = useSelectionContext();
    const [showFullView, setShowFullView] = useState(false);

    // Find the selected task
    const selectedTask = selection.selectionValue 
        ? user.tasks.tasks.find(task => task.id.toString() === selection.selectionValue)
        : null;

    // Reset to preview mode when selection changes
    useEffect(() => {
        setShowFullView(false);
    }, [selection.selectionValue]);

    // Listen for view task events
    useEffect(() => {
        const handleViewTask = () => {
            if (selectedTask) {
                setShowFullView(true);
            }
        };

        // Add event listener for view task button clicks
        window.addEventListener('viewTask', handleViewTask);
        
        return () => {
            window.removeEventListener('viewTask', handleViewTask);
        };
    }, [selectedTask]);

    const handleCloseView = () => {
        setShowFullView(false);
    };

    return (
        <div className={`${styles.displayBox} ${showFullView ? styles.fullView : styles.preview}`}>
            {selectedTask ? (
                showFullView ? (
                    <div className={styles.viewTaskWrapper}>
                        <ViewTask 
                            task={selectedTask}
                            onClose={handleCloseView}
                        />
                    </div>
                ) : (
                    <div className={styles.taskDetails}>
                        <div className={styles.taskTitle}>{selectedTask.name}</div>
                        <div className={styles.taskDescription}>{selectedTask.description || 'No description available.'}</div>
                        <div className={styles.taskMeta}>
                            Task ID: {selectedTask.id}
                            {selectedTask.priority && ` • Priority: ${selectedTask.priority}`}
                            {selectedTask.status && ` • Status: ${selectedTask.status}`}
                        </div>
                        <button 
                            className={`btn ${styles.viewButton}`}
                            onClick={() => setShowFullView(true)}
                        >
                            View Full Details
                        </button>
                    </div>
                )
            ) : (
                <div className={styles.placeholder}>
                    Please select a task to view details.
                </div>
            )}
        </div>
    );
}