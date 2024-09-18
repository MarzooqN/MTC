import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.token) {
        // Store the token in localStorage or sessionStorage
        localStorage.setItem('token', data.token);  // Use sessionStorage if you prefer sessionStorage
        window.location.href = '/';  // Redirect to homepage
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="auth-container">
        <div className='form-div'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <button className='signup-btn' onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    </div>
  );
};

export default Login;
