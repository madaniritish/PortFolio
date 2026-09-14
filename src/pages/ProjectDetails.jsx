import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TechStack from '../components/TechStack';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ProjectDetails() {
  const { projectId } = useParams();
  const [currentId, setCurrentId] = useState(projectId);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  if (currentId !== projectId) {
    setCurrentId(projectId);
    setLoading(true);
    setNotFound(false);
    setError(null);
    setProject(null);
  }

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/api/projects/${projectId}`)
      .then((res) => {
        if (res.status === 404) {
          if (isMounted) {
            setNotFound(true);
            setLoading(false);
          }
          return null;
        }
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted && data) {
          setProject(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error loading project:', err);
          setError('Unable to load project details. Please try again later.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  if (loading) {
    return (
      <section className="detail-card" aria-live="polite">
        <article className="loading-container">
          <div className="spinner" role="status" aria-label="Loading project details"></div>
          <p className="loading-text">Loading project details...</p>
        </article>
      </section>
    );
  }

  if (notFound) {
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

  if (error || !project) {
    return (
      <section className="detail-card">
        <article>
          <Link to="/projects" className="back-link">&larr; Back to Projects</Link>
          <h2>Error</h2>
          <p className="error-text" style={{ fontSize: '1.05rem', marginTop: '10px' }}>
            {error || 'An unexpected error occurred.'}
          </p>
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
