import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    height: '',
    weight: '',
    city: '',
    state: '',
    picture: '',
    hobbies: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'profiles', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };
    fetchProfile();
  }, [currentUser.uid]);

  const handleLogout = async () => {
    try {
      await logout(navigate);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'profiles', currentUser.uid), profile);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <div className='content'>
      <h1>Welcome, {currentUser.email}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Upload your picture
          <input
            type='text'
            name='picture'
            value={profile.picture}
            onChange={handleChange}
          />
        </label>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={profile.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Height:
          <input
            type='text'
            name='height'
            value={profile.height}
            onChange={handleChange}
          />
        </label>
        <label>
          Weight:
          <input
            type='text'
            name='weight'
            value={profile.weight}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type='text'
            name='city'
            value={profile.city}
            onChange={handleChange}
          />
        </label>
        <label>
          State:
          <input
            type='text'
            name='state'
            value={profile.state}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Hobbies:
          <input
            type='text'
            name='hobbies'
            value={profile.hobbies}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Update Profile</button>
      </form>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
