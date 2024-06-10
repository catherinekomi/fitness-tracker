import React, { useRef, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/profile');
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type='email' ref={emailRef} required />
        </div>
        <div>
          <label>Password</label>
          <input type='password' ref={passwordRef} required />
        </div>
        <button disabled={loading} type='submit'>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
