import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateProject from './components/CreateProject'; 

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');  // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token on logout
    window.location.reload();  // Reload to update the UI
  };

  return (
    <Router>
      <div className="app-container p-2">
        <header className="header rounded-4 shadow-lg py-4">
          <h1>MTC Projects</h1>
          <div className='button-container'>
            {!isLoggedIn && (
              <button className="login-btn" onClick={() => window.location.href = '/login'}>
                Login
              </button>
            )}
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

        <div className='bg-gradient p-3 rounded-4 shadow-lg mt-1'>

          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create-project" element={<CreateProject />} />  {/* Protected route for project creation */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
