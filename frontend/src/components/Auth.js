import React, { useState } from 'react';


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleToggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://mtc-l08s.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/'; // Redirect to home
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://mtc-l08s.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (data.message) {
        window.location.href = '/login'; // Redirect to login after successful signup
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div style={{'display': 'flex', 'justifyContent': 'center', 'height':'100vh', 'alignItems':'center'}}>
    <div className={`wrapper ${!isLogin ? 'active' : ''}`}>  {/* Toggle wrapper class for animations */}
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

        <div className="form-box login">
          <h2 className="title animation" style={{ '--i': 0, '--j': 21 }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }}>Login</button>
            {error && <p className="error-message">{error}</p>}
            <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 }}>
              <p>Don't have an account? <a onClick={handleToggleForm} className="register-link">Sign Up</a></p>
            </div>
          </form>
        </div>

        <div className="info-text login">
            <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>Welcome Back!</h2>
            <p className="animation" style={{ '--i': 1, '--j': 21 }}>Please Use Your Buckeyemail.osu.edu email!</p>
        </div>

        <div className="form-box register">
          <h2 className="title animation" style={{ '--i': 17, '--j': 0 }}>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Name</label>
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn animation" style={{ '--i': 21, '--j': 4 }}>Sign Up</button>
            {error && <p className="error-message">{error}</p>}
            <div className="linkTxt animation" style={{ '--i': 22, '--j': 5 }}>
              <p>Already have an account? <a onClick={handleToggleForm} className="login-link">Login</a></p>
            </div>
          </form>
        </div>
     

      <div className="info-text register">
        <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>Welcome Back!</h2>
        <p className="animation" style={{ '--i': 18, '--j': 1 }}>Please Use Your Buckeyemail.osu.edu email!</p>
      </div>
    </div>
    </div>
  );
};

export default Auth;
