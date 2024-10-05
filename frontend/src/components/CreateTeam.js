import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateTeam = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to create a team.');
      navigate('/auth');
      return;
    }

    try {
      const response = await fetch('https://mtc-l08s.onrender.com/api/teams/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ team_name: teamName }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Team created successfully!');
        navigate('/teams');
      } else {
        setError(data.error || 'Failed to create team.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="create-project-container">
      <h2>Create a Hackathon Team</h2>
      <form onSubmit={handleCreateTeam}>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <button type="submit">Create Team</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default CreateTeam;
