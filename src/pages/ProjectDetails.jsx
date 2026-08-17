import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import TechStack from '../components/TechStack';

function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section className="detail-card">
        <article>
          <Link to="/projects" className="back-link">&larr; Back to Projects</Link>
          <h2>Project Not Found</h2>
          <p>The project with ID &quot;{projectId}&quot; does not exist.</p>
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
        
        {project.highlights && project.highlights.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Key Highlights</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {project.highlights.map((highlight, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}

        <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Technologies Used</h3>
        <TechStack techStack={project.techStack} />

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
