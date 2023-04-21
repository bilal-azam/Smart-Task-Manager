import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../store/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await dispatch(updateUserProfile({ username, email }));
      setEditMode(false);
      setMessage('Profile updated successfully!');
    } catch {
      setMessage('Failed to update profile');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        user && (
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
        )
      )}
    </div>
  );
};

export default Profile;
