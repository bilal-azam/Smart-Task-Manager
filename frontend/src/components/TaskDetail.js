import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = useSelector((state) => state.tasks.tasks.find((task) => task._id === id));

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      navigate('/');
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  if (!task) {
    return <p>Task not found</p>;
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default TaskDetail;
