import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import TechBadgeList from '../components/TechBadgeList';

function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section className="detail-card">
        <article>
          <Link to="/projects" className="back-link">&larr; Back to Projects</Link>
          <h2>Project Not Found</h2>
          <p>The project with ID "{projectId}" does not exist.</p>
        </article>
      </section>
    );
  }

  return (
    <section className="detail-card">
      <article>
        <Link to="/projects" className="back-link">&larr; Back to Projects</Link>
        <h2>{project.title}</h2>
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="project-card-image"
            style={{ height: '300px', margin: '20px 0' }}
          />
        )}
        <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>{project.description}</p>
        
        <h3>Technologies Used</h3>
        <TechBadgeList techStack={project.techStack} />

        <div style={{ marginTop: '24px' }}>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn"
            >
              View Repository Code &rarr;
            </a>
          )}
        </div>
      </article>
    </section>
  );
}

export default ProjectDetails;
