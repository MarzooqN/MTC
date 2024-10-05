import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('https://mtc-l08s.onrender.com/api/teams');
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        console.error('Error fetching hackathon teams:', err);
      }
    };

    fetchTeams();
  }, []);

  const handleJoinTeam = async (teamId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to join a team.');
      window.location.href = '/auth';
      return;
    }

    try {
      const response = await fetch(`https://mtc-l08s.onrender.com/api/teams/join/${teamId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('Joined the team successfully!');
        window.location.reload();  // Reload the page to reflect the changes
      } else {
        alert(data.error || 'Failed to join the team.');
      }
    } catch (err) {
      console.error('Error joining team:', err);
    }
  };

  return (
    <div className="container mx-3">
      <div className="row">
        {teams.map(team => (
          <div className="col-md-4" key={team.id}>
            <TeamCard team={team} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
