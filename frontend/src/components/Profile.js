import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuthenticated } from '../utils/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        setMessage('Failed to load profile');
      }
    };

    if (isAuthenticated()) {
      fetchUserProfile();
    }
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/user/profile',
        { username, email },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setUser(response.data);
      setEditMode(false);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {message && <p>{message}</p>}
      {user ? (
        <div>
          {editMode ? (
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
