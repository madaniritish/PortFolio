import { useState, useEffect } from 'react';

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section id="home" aria-busy="true" aria-live="polite">
        <article className="loading-container">
          <div className="spinner" role="status" aria-label="Loading content"></div>
          <p className="loading-text">Loading portfolio profile...</p>
        </article>
      </section>
    );
  }

  return (
    <section id="home">
      <article>
        <h2>Introduction</h2>
        <p>
          Hello! I'm Ritish, a Full Stack Development student passionate about
          web development, programming, and creating responsive websites.
        </p>
      </article>
    </section>
  );
}

export default Home;
