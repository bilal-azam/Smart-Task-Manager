const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
});

test('GET /tasks - should return all tasks', async () => {
  const response = await request(app).get('/tasks').set('Authorization', 'Bearer testtoken');
  expect(response.statusCode).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

test('POST /tasks - should create a new task', async () => {
  const newTask = { title: 'New Task', description: 'Test Description', dueDate: '2023-05-01', priority: 'High' };
  const response = await request(app).post('/tasks').send(newTask).set('Authorization', 'Bearer testtoken');
  expect(response.statusCode).toBe(201);
  expect(response.body.title).toBe(newTask.title);
});
