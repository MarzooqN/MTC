import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState('');
  const [slackLink, setSlackLink] = useState('');
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to create a project.');
      navigate('/login');
      return;
    }

    const projectData = {
      title,
      description,
      languages,
      slack_link: slackLink,
      purpose,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/projects/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      // Check for token expiration or invalid token
      if (response.status === 401) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');  // Redirect to login
        return;
      }

      const data = await response.json();

      if (response.ok) {
        alert('Project created successfully!');
        navigate('/');  // Redirect to home page after creation
      } else {
        setError(data.error || 'Failed to create project');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="create-project-container">
      <h2>Create a New Project</h2>
      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Languages/Frameworks"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Slack Link"
          value={slackLink}
          onChange={(e) => setSlackLink(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Purpose (e.g., Personal, Non-Profit)"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
        />
        <button type="submit">Create Project</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default CreateProject;
