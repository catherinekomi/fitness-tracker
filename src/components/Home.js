import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/profile');
    } catch (error) {
      console.error('Error during authentication:', error.message);
    }
  };

  return (
    <div>
      <h1>{isSignup ? 'Sign Up' : 'Log In'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>{isSignup ? 'Sign Up' : 'Log In'}</button>
      </form>
      <p>
        {isSignup ? (
          <>
            Already have an account?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => setIsSignup(false)}
            >
              Log In
            </span>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => setIsSignup(true)}
            >
              Sign Up
            </span>
          </>
        )}
      </p>
    </div>
  );
}

export default Home;
