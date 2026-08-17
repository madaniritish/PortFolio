import { useState } from 'react';
import { Link } from 'react-router-dom';
import TechStack from './TechStack';

function ProjectCard({ project, id, title, description, techStack, image, link, highlights }) {
  // Support both passing an entire project object or destructured props
  const p = project || { id, title, description, techStack, image, link, highlights };
  
  // Independent state per ProjectCard instance
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <article className="project-card">
      {p.image && (
        <img src={p.image} alt={p.title} className="project-card-image" />
      )}
      <h3>{p.title}</h3>
      <p>{p.description}</p>

      {/* Prop drilling: passing techStack prop to grandchild TechStack */}
      <TechStack techStack={p.techStack} />

      {/* Conditionally rendered extra details when showDetails is true */}
      {showDetails && (
        <div className="project-details-extra">
          <strong>Key Highlights:</strong>
          {p.highlights && p.highlights.length > 0 ? (
            <ul>
              {p.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          ) : (
            <p style={{ marginTop: '6px' }}>Comprehensive architecture details and codebase available on the dedicated project page.</p>
          )}
        </div>
      )}

      <div className="project-card-actions">
        <button
          type="button"
          className="project-btn project-btn-secondary"
          onClick={toggleDetails}
          aria-expanded={showDetails}
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>

        <Link
          to={`/projects/${p.id}`}
          className="project-btn project-btn-secondary"
        >
          Full Page &rarr;
        </Link>

        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn"
          >
            Code &rarr;
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
