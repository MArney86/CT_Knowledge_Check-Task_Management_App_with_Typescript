import { useUserContext } from '../contexts/UserContext';
import TaskList from './TaskList';
import DisplayBox from './DisplayBox';
import styles from './TasksLayout.module.css';

const TasksLayout: React.FC = () => {
    const { user } = useUserContext();
  return (
    <div className={styles.tasksLayout}>
      <div className={styles.mainWindow}>
        <div className={styles.titleBar}>
          <span>📋 Task Manager - {user.name}</span>
          <span>_□✕</span>
        </div>
        <div className={styles.windowContent}>
          <div className={styles.leftPanel}>
            <h3 className={styles.sectionTitle}>Task List</h3>
            <TaskList />
          </div>
          <div className={styles.rightPanel}>
            <h3 className={styles.sectionTitle}>Task Details</h3>
            <DisplayBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksLayout;