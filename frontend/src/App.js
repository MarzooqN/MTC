import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateProject from './components/CreateProject'; 
import { isTokenExpired, isTokenNearExpiry, refreshToken } from './utils';
import { useEffect } from 'react';

const App = () => {

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token || isTokenExpired(token)) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        window.location.href = '/login';  // Redirect to login if token is expired
      } else if (isTokenNearExpiry(token)) {
        // If token is about to expire, refresh it
        const refreshed = await refreshToken();
        if (!refreshed) {
          alert('Failed to refresh token. Please log in again.');
          window.location.href = '/login';   // Redirect to login if token cannot be refreshed
        }
      }
    };

    
    // Check token expiration every 5 minutes (300000 ms)
    const intervalId = setInterval(checkToken, 300000);  // 5 minutes
    if (window.location.href.slice(-6) !== '/login'){
      
      checkToken();  // Run on initial load
    }

    return () => clearInterval(intervalId);  // Clean up interval on component unmount
  }, []);

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>MTC Projects</h1>
          <div className='button-container'>

          {!isLoggedIn && <button className="login-btn" onClick={() => window.location.href = '/login'}>Login</button>}
          {isLoggedIn && (
            <>

              <button className="logout-btn" onClick={handleLogout}>Logout</button>
              <button className="create-project-btn" onClick={() => window.location.href = '/create-project'}>
                Create Project
              </button>

            </>
          )}
          </div>
        </header>


            <Routes>
              <Route path="/" element={<ProjectList />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/create-project" element={<CreateProject />} />  {/* Add the new route */}
            </Routes>

      </div>
    </Router>
  );
};

export default App;
