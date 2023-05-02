import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsername(response.data.username);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/auth/profile', { username, email, role }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/profile');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
