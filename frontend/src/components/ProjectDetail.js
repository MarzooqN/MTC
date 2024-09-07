import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/projects/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProject();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>{project.title}</h2>
      <ul>
        <li><strong>Description:</strong> {project.description}</li>
        <li><strong>Languages:</strong> {project.languages}</li>
        <li><strong>Members:</strong>
          <ul>
            {project.members.map((member, index) => (
              <li key={index}>
                {member.name} ({member.role}) - {member.email}
              </li>
            ))}
          </ul>
        </li>
        <li><strong>Member Count:</strong> {project.members_count}</li>
      </ul>
      <Button variant="primary" onClick={() => alert('Join Slack functionality will be implemented later.')}>
        Join Slack
      </Button>
    </div>
  );
};

export default ProjectDetail;
