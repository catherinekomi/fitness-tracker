import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(navigate);
  };

  return (
    <div>
      <h1>Welcome, {currentUser?.email}</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Profile;
