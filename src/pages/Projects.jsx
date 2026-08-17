import { projects } from '../data/projects';
import ProjectList from '../components/ProjectList';

function Projects() {
  return (
    <section id="projects-page">
      <h2>Projects</h2>
      {/* Level 1 of Prop Drilling: Passing projects array to ProjectList */}
      <ProjectList projects={projects} />
    </section>
  );
}

export default Projects;
