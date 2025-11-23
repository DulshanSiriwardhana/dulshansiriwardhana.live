import SectionTitle from "../components/SectionTitle";
import { projects } from "../constants/landingPageData";
import type { Project } from "../constants/landingPageData";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/50 hover:bg-[#1a1a1a]/70 transition-all duration-300">
      <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 mb-4 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, techIndex) => (
          <span
            key={techIndex}
            className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-400"
          >
            {tech}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        className="text-green-400 hover:text-green-300 text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
      >
        View Project
        <span>→</span>
      </a>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 relative z-10"
    >
      <div className="max-w-6xl w-full space-y-12">
        <SectionTitle
          title="Projects"
          subtitle="A showcase of my recent work and contributions"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

