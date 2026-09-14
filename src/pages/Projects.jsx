import { useState, useEffect } from 'react';
import ProjectList from '../components/ProjectList';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setProjects(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to fetch projects:', err);
          setError('Unable to load projects. Please try again later.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="projects-page">
      <h2>Projects</h2>

      {loading && (
        <article className="loading-container" aria-live="polite">
          <div className="spinner" role="status" aria-label="Loading projects"></div>
          <p className="loading-text">Loading projects...</p>
        </article>
      )}

      {error && !loading && (
        <article style={{ textAlign: 'center', padding: '40px 20px' }} role="alert">
          <p className="error-text" style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
            {error}
          </p>
        </article>
      )}

      {!loading && !error && (
        <ProjectList projects={projects} />
      )}
    </section>
  );
}

export default Projects;
