import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTaskAsync, updateTaskAsync } from '../store/taskSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTaskAsync(task._id));
  };

  const toggleCompletion = () => {
    dispatch(updateTaskAsync({ id: task._id, task: { ...task, completed: !task.completed } }));
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleCompletion}
      />
      {task.title}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TaskItem;
