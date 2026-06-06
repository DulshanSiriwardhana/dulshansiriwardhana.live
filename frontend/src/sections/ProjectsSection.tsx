import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import { projects } from "../constants/landingPageData";
import type { Project } from "../constants/landingPageData";
import { Terminal, ExternalLink, Star } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group bg-[#111]/90 backdrop-blur-md border border-green-500/10 rounded-2xl p-8 hover:border-green-500/50 hover:bg-[#1a1a1a]/80 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 h-full flex flex-col relative overflow-hidden min-h-[400px] transform hover:-translate-y-2">
      {project.featured && (
        <div className="absolute top-6 right-6 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-[10px] text-green-400 font-bold z-10 shadow-lg uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
          <Star size={10} className="fill-green-400" />
          Featured
        </div>
      )}

      <div className="flex-grow space-y-6">
        <h3 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors uppercase tracking-tight pr-12">
          {project.title}
        </h3>
        <p className="text-gray-400 leading-relaxed text-sm sm:text-base font-medium">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-green-500/5 border border-green-500/10 rounded-lg text-[10px] font-bold text-green-500/80 uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 group/link transition-all"
        >
          <ExternalLink size={16} className="text-blue-400 group-hover/link:scale-125 transition-transform" />
          View Project
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 group/git transition-all"
          >
            <Terminal size={16} className="text-white group-hover/git:scale-125 transition-transform" />
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
      <div className="max-w-[1720px] w-full space-y-12">
        <SectionTitle
          title="Projects"
          subtitle="A showcase of my recent work and contributions"
        />

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${filter === "all"
              ? "bg-green-500/20 border-2 border-green-500/50 text-green-400 shadow-xl shadow-green-500/20"
              : "bg-black/40 border border-gray-800 text-gray-500 hover:border-green-500/40 hover:text-green-400 hover:scale-105"
              }`}
          >
            All Repos
          </button>
          {allTech.slice(0, 8).map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${filter === tech
                ? "bg-green-500/20 border-2 border-green-500/50 text-green-400 shadow-xl shadow-green-500/20"
                : "bg-black/40 border border-gray-800 text-gray-500 hover:border-green-500/40 hover:text-green-400 hover:scale-105"
                }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredProjects.map((project, index) => (
            <ScrollAnimation key={index} delay={index * 100} direction="up">
              <ProjectCard project={project} />
            </ScrollAnimation>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-black/20 rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-500 uppercase tracking-widest mono text-sm italic">No data matched the current query.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
