import React, { useState } from 'react';

//define the props for the ClearTasks component
interface ClearTasksProps {
  taskCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

// ClearTasks component to confirm clearing all tasks
const ClearTasks: React.FC<ClearTasksProps> = ({ taskCount, onConfirm, onCancel }) => {
    const [isClearing, setIsClearing] = useState(false);

    //handle confirm action
    const handleConfirm = async () => {
        setIsClearing(true);
        try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        onConfirm();
        } catch (error) {
        console.error('Error clearing tasks:', error);
        } finally {
        setIsClearing(false);
        }
    };

    //progress bar for after confirming to clear tasks
    if (isClearing) {
        return (
        <div className="overlay">
            <div className="loadingDialog">
                <div className="loadingTitle">Clearing Tasks...</div>
                <div className="progressBar">
                    <div className="progressFill"></div>
                </div>  
            </div>
        </div>
        );
    }

    return (
        <div className="overlay">
            {/*confirmation dialog for clearing tasks*/}
            <div className="clearDialog">
                <div className="titleBar">
                    <span>⚠️ Confirm Clear All</span>
                </div>
                
                <div className="dialogContent">
                    <div className="warningIcon">
                        🗑️
                    </div>
                    
                    <div className="warningMessage">
                        <h3 className="warningTitle">Clear All Tasks?</h3>
                        <p className="warningText">
                            Are you sure you want to clear all tasks?
                        </p>
                        <div className="taskInfo">
                            <strong>{taskCount} task{taskCount !== 1 ? 's' : ''} will be deleted</strong>
                        </div>
                        <p className="warningSubtext">
                            This action cannot be undone.
                        </p>
                    </div>  
                </div>

                <div className="buttonGroup">
                    <button 
                    className="actionButton cancelButton"
                    onClick={onCancel}>
                        Cancel
                    </button>
                    <button 
                    className="actionButton clearButton"
                    onClick={handleConfirm}>
                        🗑️ Clear All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClearTasks;
