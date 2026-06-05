import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import { experience } from "../constants/landingPageData";
import { Briefcase, Calendar, Building2, ChevronRight } from "lucide-react";

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-6xl w-full space-y-12">
        <SectionTitle
          title="Experience"
          subtitle="My professional journey and career milestones"
        />

        <div className="relative pt-10">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500/80 via-green-500/20 to-transparent transform md:-translate-x-1/2 hidden md:block"></div>
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500/80 via-green-500/20 to-transparent md:hidden"></div>

          <div className="space-y-16">
            {experience.map((exp, index) => (
              <ScrollAnimation key={index} delay={index * 150} direction="up">
                <div
                  className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-black border-2 border-green-500 rounded-xl transform md:-translate-x-1/2 z-20 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)] group hover:scale-125 transition-transform duration-300">
                    <Briefcase size={14} className="text-green-400" />
                  </div>

                  <div
                    className={`ml-16 md:ml-0 w-full md:w-[45%] ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                      }`}
                  >
                    <div className="bg-[#111]/90 backdrop-blur-md border border-green-500/10 rounded-2xl p-8 hover:border-green-500/40 hover:bg-[#1a1a1a]/80 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 transform hover:-translate-y-2 group">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors uppercase tracking-tight">
                            {exp.position}
                          </h3>
                          <div className="flex items-center gap-2 text-green-400 font-bold text-sm tracking-widest uppercase">
                            <Building2 size={14} className="text-blue-400" />
                            {exp.company}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-widest mono">
                          <Calendar size={12} className="text-green-500" />
                          {exp.duration}
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {exp.description.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="text-gray-400 text-xs sm:text-sm flex items-start group/li"
                          >
                            <ChevronRight size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0 group-hover/li:translate-x-1 transition-transform" />
                            <span className="group-hover/li:text-gray-200 transition-colors">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {exp.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-[10px] font-bold text-green-400 uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
