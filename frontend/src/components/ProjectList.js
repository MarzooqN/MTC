import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
      console.log(data)
    };
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {projects.map(project => (
          <div className="col-md-4" key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
