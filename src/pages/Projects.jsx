import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

function Projects() {
  return (
    <section id="projects-page">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            image={project.image}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
