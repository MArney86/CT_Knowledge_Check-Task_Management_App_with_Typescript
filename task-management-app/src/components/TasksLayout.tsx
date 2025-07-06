import { useSelectionContext } from '../contexts/SelectionContext';
import type { Selection, SelectionContextType } from '../contexts/SelectionContext';
import  { useUserContext } from '../contexts/UserContext';
import TaskList from './TaskList';
import DisplayBox from './DisplayBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const TasksLayout: React.FC = () => {
    const { user } = useUserContext();
    const currentSelection = useSelectionContext() as SelectionContextType;
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col>
            <h2>{user.name}'s Tasks</h2>
            <TaskList />
          </Col>
          <Col>
            <h2>Task Details</h2>
            <DisplayBox />
          </Col>
        </Row>        
      </Container>
    </>
  );
};

export default TasksLayout;