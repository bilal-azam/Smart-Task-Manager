import { configureStore } from '@reduxjs/toolkit';
import taskReducer, { fetchTasks, addTask, updateTask, deleteTask } from '../taskSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const store = configureStore({ reducer: { tasks: taskReducer } });

test('should handle initial state', () => {
  expect(store.getState().tasks).toEqual({
    tasks: [],
    status: 'idle',
    error: null
  });
});

test('should handle fetchTasks', async () => {
  const tasks = [{ _id: '1', title: 'Test Task', dueDate: '2023-05-01', priority: 'Medium' }];
  mock.onGet('http://localhost:5000/tasks').reply(200, tasks);

  await store.dispatch(fetchTasks());

  expect(store.getState().tasks.tasks).toEqual(tasks);
});

test('should handle addTask', async () => {
  const newTask = { _id: '2', title: 'New Task', dueDate: '2023-05-02', priority: 'High' };
  mock.onPost('http://localhost:5000/tasks').reply(201, newTask);

  await store.dispatch(addTask(newTask));

  expect(store.getState().tasks.tasks).toContainEqual(newTask);
});

test('should handle updateTask', async () => {
  const updatedTask = { _id: '1', title: 'Updated Task', dueDate: '2023-05-03', priority: 'Low' };
  mock.onPut('http://localhost:5000/tasks/1').reply(200, updatedTask);

  await store.dispatch(updateTask({ id: '1', updatedTask }));

  expect(store.getState().tasks.tasks.find(task => task._id === '1')).toEqual(updatedTask);
});

test('should handle deleteTask', async () => {
  mock.onDelete('http://localhost:5000/tasks/1').reply(200);

  await store.dispatch(deleteTask('1'));

  expect(store.getState().tasks.tasks.find(task => task._id === '1')).toBeUndefined();
});
