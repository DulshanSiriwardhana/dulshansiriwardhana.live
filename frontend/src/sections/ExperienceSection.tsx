import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import { experience } from "../constants/landingPageData";

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-5xl w-full space-y-12">
        <SectionTitle
          title="Experience"
          subtitle="My professional journey and career milestones"
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 via-green-500/30 to-transparent transform md:-translate-x-1/2 hidden md:block"></div>
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 via-green-500/30 to-transparent md:hidden"></div>

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <ScrollAnimation key={index} delay={index * 150} direction="up">
                <div
                  className={`relative flex items-start ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-green-400 rounded-full border-4 border-black transform md:-translate-x-1/2 z-20"></div>

                {/* Content card */}
                <div
                  className={`ml-16 md:ml-0 w-full md:w-5/12 ${
                    index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/50 hover:bg-[#1a1a1a]/70 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1">
                          {exp.position}
                        </h3>
                        <p className="text-green-400 font-medium text-sm sm:text-base">{exp.company}</p>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-gray-400 text-sm flex items-start"
                        >
                          <span className="text-green-400 mr-2 mt-1">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-400"
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

