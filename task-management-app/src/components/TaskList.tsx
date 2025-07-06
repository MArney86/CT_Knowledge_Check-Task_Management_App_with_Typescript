import { useUserContext } from "../contexts/UserContext";
import ListBox from "./ListBox";


const TaskList: React.FC = () => {
    const { user } = useUserContext();
  return (
    <div className="task-list">
      <h2>{user.name}'s Tasks</h2>
      <ListBox items={user.tasks.tasks} placeholder="Select a task" />
    </div>
  );
};

export default TaskList;