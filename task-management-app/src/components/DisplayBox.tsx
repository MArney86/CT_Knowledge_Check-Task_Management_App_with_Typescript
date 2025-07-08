import { useSelectionContext } from "../contexts/SelectionContext";
import { useUserContext } from "../contexts/UserContext";
import { useState, useEffect } from "react";
import ViewTask from "./ViewTask";

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
        <div className={`displayBox ${showFullView ? 'fullView' : 'preview'}`}>
            {selectedTask ? (
                showFullView ? (
                    <div className="viewTaskWrapper">
                        <ViewTask 
                            task={selectedTask}
                            onClose={handleCloseView}
                        />
                    </div>
                ) : (
                    <div className="taskDetails">
                        <div className="taskTitle">{selectedTask.name}</div>
                        <div className="taskDescription">{selectedTask.description || 'No description available.'}</div>
                        <div className="taskMeta">
                            {selectedTask.priority && ` • Priority: ${selectedTask.priority}`}
                            {selectedTask.status && ` • Status: ${selectedTask.status}`}
                        </div>
                        <button 
                            className="btn viewButton"
                            onClick={() => setShowFullView(true)}
                        >
                            View Full Details
                        </button>
                    </div>
                )
            ) : (
                <div className="placeholder">
                    Please select a task to view details.
                </div>
            )}
        </div>
    );
}