import { Link } from 'react-router-dom';
import TechBadgeList from './TechBadgeList';

function ProjectCard({ id, title, description, techStack, image, link }) {
  return (
    <article className="project-card">
      {image && (
        <img src={image} alt={title} className="project-card-image" />
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      
      {/* Prop drilling demonstration: passing techStack prop to child component */}
      <TechBadgeList techStack={techStack} />

      <div className="project-card-actions">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn"
          >
            View Code &rarr;
          </a>
        )}
        <Link
          to={`/projects/${id}`}
          className="project-btn project-btn-secondary"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;
