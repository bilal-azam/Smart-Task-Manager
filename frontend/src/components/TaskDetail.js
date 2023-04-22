import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams();
  const task = useSelector((state) => state.tasks.tasks.find((task) => task._id === id));

  if (!task) {
    return <p>Task not found</p>;
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
    </div>
  );
};

export default TaskDetail;
