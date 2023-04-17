import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as taskApi from '../api/taskApi';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await taskApi.getTasks();
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await taskApi.createTask(task);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, task }) => {
  const response = await taskApi.updateTask(id, task);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await taskApi.deleteTask(id);
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
