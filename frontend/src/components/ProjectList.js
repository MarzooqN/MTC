import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Form, Button, Table } from 'react-bootstrap';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState({
    language: '',
    memberCount: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/projects');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("There was an error fetching the projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = () => {
    let filtered = projects;

    if (filter.language) {
      filtered = filtered.filter(project =>
        project.languages.toLowerCase().includes(filter.language.toLowerCase())
      );
    }

    if (filter.memberCount) {
      filtered = filtered.filter(project => project.members_count >= parseInt(filter.memberCount));
    }

    setFilteredProjects(filtered);
  };

  return (
    <div className="container">
      <h2>Projects List</h2>

      <Form>
        <Form.Group controlId="filterLanguage">
          <Form.Label>Filter by Language</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter language"
            name="language"
            value={filter.language}
            onChange={handleFilterChange}
          />
        </Form.Group>

        <Form.Group controlId="filterMemberCount">
          <Form.Label>Filter by Minimum Member Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter minimum member count"
            name="memberCount"
            value={filter.memberCount}
            onChange={handleFilterChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={applyFilter}>Apply Filters</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Languages</th>
            <th>Members</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectList;
