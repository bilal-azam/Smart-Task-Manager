import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTaskAsync, updateTaskAsync } from '../store/taskSlice';
import { ListGroup } from 'react-bootstrap';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTaskAsync(task._id));
  };

  const toggleCompletion = () => {
    dispatch(updateTaskAsync({ id: task._id, task: { ...task, completed: !task.completed } }));
  };

  return (
    <ListGroup.Item>
      <a href={`/tasks/${task._id}`}>{task.title}</a>
      <button onClick={handleDelete}>Delete</button>
    </ListGroup.Item>
  );
};

export default TaskItem;
