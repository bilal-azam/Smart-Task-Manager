import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      dispatch(addTask({ title, description, dueDate, priority }));
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      ></textarea>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due Date"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
