import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import UpdateTask from './components/UpdateTask';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/tasks/:id/update" element={<UpdateTask />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
