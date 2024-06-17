import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Home() {
  const { signup, login, loginWithGoogle } = useAuth();
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

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/profile');
    } catch (error) {
      console.error('Error during Google authentication:', error.message);
    }
  };

  // get the background situated
  useEffect(() => {
    document.body.classList.add('home-background');
    return () => {
      document.body.classList.remove('home-background');
    };
  }, []);

  return (
    <div className='content'>
      <div className='auth-container'>
        <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
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
        <button onClick={handleGoogleLogin} className='google-button'>
          <img
            src='https://developers.google.com/identity/images/g-logo.png'
            alt='Google logo'
            className='google-logo'
          />
          Sign in with Google
        </button>
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
    </div>
  );
}

export default Home;
