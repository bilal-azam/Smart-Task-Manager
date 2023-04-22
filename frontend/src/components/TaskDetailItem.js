import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task }) => {
  return (
    <li>
      <Link to={`/tasks/${task._id}`}>
        <h3>{task.title}</h3>
        <p>Due: {task.dueDate} | Priority: {task.priority}</p>
      </Link>
    </li>
  );
};

export default TaskItem;
