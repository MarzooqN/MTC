import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <tr>
      <td>{project.title}</td>
      <td>{project.languages}</td>
      <td>{project.members_count}</td>
      <td><Button variant="info" onClick={goToDetail}>Learn More</Button></td>
    </tr>
  );
};

export default ProjectCard;
