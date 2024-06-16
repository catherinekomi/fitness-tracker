import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(navigate);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div>
      <h1>Welcome, {currentUser.email}</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
