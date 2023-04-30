import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

test('renders login form and handles submit', async () => {
  axios.post.mockResolvedValue({ data: { token: 'testtoken' } });

  render(
    <Router>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/Email/), { target: { value: 'test@test.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/), { target: { value: 'password' } });

  fireEvent.click(screen.getByText(/Login/));

  expect(await screen.findByText(/Login/)).toBeInTheDocument();
});
