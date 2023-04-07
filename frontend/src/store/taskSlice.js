import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskApi';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await getTasks();
  return response.data;
});

export const addTaskAsync = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await createTask(task);
  return response.data;
});

export const updateTaskAsync = createAsyncThunk('tasks/updateTask', async ({ id, task }) => {
  const response = await updateTask(id, task);
  return response.data;
});

export const deleteTaskAsync = createAsyncThunk('tasks/deleteTask', async (id) => {
  await deleteTask(id);
  return id;
});

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
