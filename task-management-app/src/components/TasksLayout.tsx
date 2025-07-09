import { useUserContext } from '../contexts/UserContext';
import TaskList from './TaskList';
import DisplayBox from './DisplayBox';

const TasksLayout: React.FC = () => {
    const { user } = useUserContext();
  return (
    <div className="tasksLayout">
        {/*mimic a windows 98/2000 window UI with 2 panels for selecting and displaying tasks*/}
      <div className="mainWindow">
        <div className="titleBar">
          <span>📋 Task Manager - {user.name}</span>
          <span>_□✕</span>
        </div>
        <div className="windowContent flex">
          <div className="leftPanel">
            <h3 className="sectionTitle">Task List</h3>
            <TaskList />
          </div>
          <div className="rightPanel">
            <h3 className="sectionTitle">Task Details</h3>
            <DisplayBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksLayout;