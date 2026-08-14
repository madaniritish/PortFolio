import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="not-found-container">
      <article>
        <h2>404</h2>
        <h3>Page Not Found</h3>
        <p style={{ margin: '15px 0' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/Home" className="project-btn">
          Go Back to Home
        </Link>
      </article>
    </section>
  );
}

export default NotFound;
