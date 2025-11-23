import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import { projects } from "../constants/landingPageData";
import type { Project } from "../constants/landingPageData";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/50 hover:bg-[#1a1a1a]/70 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
      {project.featured && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs text-green-400 font-medium">
          Featured
        </div>
      )}
      
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors break-words">
        {project.title}
      </h3>
      <p className="text-gray-400 mb-4 leading-relaxed flex-grow text-sm sm:text-base break-words">
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
      <div className="flex gap-4 mt-auto">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300 text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
        >
          View Project
          <span>→</span>
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-400 text-sm font-medium transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [filter, setFilter] = useState<string>("all");
  const allTech = Array.from(new Set(projects.flatMap((p) => p.tech)));
  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  const filteredProjects =
    filter === "all"
      ? [...featuredProjects, ...regularProjects]
      : projects.filter((p) => p.tech.includes(filter));

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-7xl w-full space-y-12">
        <SectionTitle
          title="Projects"
          subtitle="A showcase of my recent work and contributions"
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-green-500/20 border border-green-500/50 text-green-400"
                : "bg-[#1a1a1a]/50 border border-gray-600 text-gray-400 hover:border-green-500/30 hover:text-green-400"
            }`}
          >
            All
          </button>
          {allTech.slice(0, 6).map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === tech
                  ? "bg-green-500/20 border border-green-500/50 text-green-400"
                  : "bg-[#1a1a1a]/50 border border-gray-600 text-gray-400 hover:border-green-500/30 hover:text-green-400"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredProjects.map((project, index) => (
            <ScrollAnimation key={index} delay={index * 100} direction="up">
              <ProjectCard project={project} />
            </ScrollAnimation>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects found with this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

