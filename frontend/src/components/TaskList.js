import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../store/taskSlice';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { logout } from '../utils/auth';
import { useHistory } from 'react-router-dom';

const TaskList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <div>
      <h2>Task List</h2>
      <button onClick={handleLogout}>Logout</button>
      <AddTaskForm />
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
