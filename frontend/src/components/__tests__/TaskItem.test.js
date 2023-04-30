import React from 'react';
import { render } from '@testing-library/react';
import TaskItem from '../TaskItem';

test('renders task title and due date', () => {
  const task = {
    _id: '1',
    title: 'Test Task',
    dueDate: '2023-05-01',
    priority: 'Medium'
  };

  const { getByText } = render(<TaskItem task={task} />);
  expect(getByText(/Test Task/)).toBeInTheDocument();
  expect(getByText(/Due: 2023-05-01/)).toBeInTheDocument();
});
