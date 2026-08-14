

function TechBadgeList({ techStack }) {
  if (!techStack || !Array.isArray(techStack)) return null;

  return (
    <div className="skills-badges" style={{ marginTop: '12px' }}>
      {techStack.map((tech, index) => (
        <span key={index} className="skill-badge" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
          {tech}
        </span>
      ))}
    </div>
  );
}

export default TechBadgeList;
