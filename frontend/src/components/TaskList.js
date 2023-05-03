import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../store/taskSlice';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { sendNotification } from '../utils/notification';

const TaskList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Due Date');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const now = new Date();
    tasks.forEach((task) => {
      const dueDate = new Date(task.dueDate);
      if (dueDate > now && dueDate <= now.setDate(now.getDate() + 3)) {
        sendNotification(`Task "${task.title}" is due soon!`);
      }
    });
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'High Priority') return task.priority === 'High';
    if (filter === 'Due Soon') {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const timeDiff = dueDate.getTime() - today.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      return daysDiff <= 3;
    }
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'Due Date') return new Date(a.dueDate) - new Date(b.dueDate);
    if (sort === 'Priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks/search?query=${searchQuery}`);
      dispatch(fetchTasks(response.data));
    } catch (err) {
      console.error('Error searching tasks:', err);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <div>
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="High Priority">High Priority</option>
          <option value="Due Soon">Due Soon</option>
        </select>
        <label>Sort By:</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="Due Date">Due Date</option>
          <option value="Priority">Priority</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <AddTaskForm />
      <ul>
        {sortedTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
