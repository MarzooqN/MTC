import React from 'react';
import { Button } from 'react-bootstrap';

const TeamCard = ({ team }) => {

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
    <div className="card shadow-lg">
      <h4 className="card-title">{team.team_name}</h4>

      {team.members.map((member, idx) => (
        <p key={idx}>{member.name} ({member.email})</p>
      ))}


      <Button onClick={() => {if(team.members.length < 4) {handleJoinTeam(team.id)} else {alert('Only 4 people allowed on a team')}}}>Join Team</Button>
    </div>
  );
};

export default TeamCard;
