import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import CreateProject from './components/CreateProject'; 
import Auth from './components/Auth';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');  // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token on logout
    window.location.reload();  // Reload to update the UI
  };

  return (
    <Router>
      <div className="app-container p-2">

      {window.location.href.slice(-5) !== '/auth' && (


        <header className="header rounded-4 shadow-lg py-4">
          <h1>MTC Projects</h1>
          <div className='button-container'>
            {!isLoggedIn && (
              <button className="login-btn" onClick={() => window.location.href = '/auth'}>
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

        )}

        <div className='rounded-4 mt-1'>

          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/create-project" element={<CreateProject />} />  {/* Protected route for project creation */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
