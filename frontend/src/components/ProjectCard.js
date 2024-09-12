import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="card">
      <h4 className="card-title">{project.title}</h4>
      <p>{project.languages}</p>
      <p>Purpose: {project.purpose}</p>
      <p>Member Count: {project.member_count}</p>
      <Button onClick={goToDetail}>Learn More</Button>
    </div>
  );
};

export default ProjectCard;
