import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [isLeadOrAdmin, setIsLeadOrAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`https://mtc-l08s.onrender.com/api/projects/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }
        const data = await response.json();
        setProject(data);

        // Check if the user is logged in and get user info
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLeadOrAdmin(false);
          return;  // Exit if no token found
        }

        // Check if the logged-in user is the project lead or admin
        const userInfoResponse = await fetch('https://mtc-l08s.onrender.com/api/auth/user-info', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userInfo = await userInfoResponse.json();
        
        if (userInfo.id === data.created_by || userInfo.role === 'admin') {
          setIsLeadOrAdmin(true);
        } 

      } catch (err) {
        setError(err.message);
      }
    };

    fetchProject();
  }, [id]);

  const handleDeleteProject = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://mtc-l08s.onrender.com/api/projects/delete/${project.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check for token expiration or invalid token
      if (response.status === 401) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');  // Redirect to login
        return;
      }


      if (response.ok) {
        alert('Project deleted successfully');
        navigate('/');
      } else {
        alert('Failed to delete project');
      }
    } catch (err) {
      alert('An error occurred. Please try again later.');
    }
  };

  const handleJoinSlack = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to join Slack.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`https://mtc-l08s.onrender.com/api/projects/slack/${project.id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check for token expiration or invalid token
      if (response.status === 401) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');  // Redirect to login
        return;
      }

      const data = await response.json();
      if (data.slack_link) {
        window.open(data.slack_link, '_blank', 'noreferrer');
      } else {
        alert('Error fetching Slack invite link');
      }
    } catch (err) {
      alert('An error occurred. Please try again later.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-detail-container">
      <h2>{project.title}</h2>
      <ul>
        <li><strong>Description:</strong> {project.description}</li>
        <li><strong>Languages:</strong> {project.languages}</li>
        <li><strong>Members:</strong>
          <ul>
            {project.members.map((member, index) => (
              <li key={index}>
                {member.name} - {member.email}
              </li>
            ))}
          </ul>
        </li>
        <li><strong>Purpose:</strong> {project.purpose}</li>
      </ul>
      <button className="join-slack-btn" onClick={handleJoinSlack}>
        Join Slack
      </button>

      {isLeadOrAdmin && (
        <button className="delete-project-btn" onClick={handleDeleteProject}>
          Delete Project
        </button>
      )}
    </div>
  );
};

export default ProjectDetail;
