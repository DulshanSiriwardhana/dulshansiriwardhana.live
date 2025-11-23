import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import SkillBar from "../components/SkillBar";
import { personalInfo, skillCategories, skillLevels } from "../constants/landingPageData";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-6xl w-full space-y-12">
        <SectionTitle title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Bio Section */}
          <div className="space-y-6">
            <ScrollAnimation direction="right">
              <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                  Who I Am
                </h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {personalInfo.bio}
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={100}>
              <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                  What I Do
                </h3>
                <ul className="space-y-3">
                  <li className="text-gray-300 flex items-start text-sm md:text-base">
                    <span className="text-green-400 mr-3 mt-1 flex-shrink-0">▹</span>
                    <span>Develop blockchain applications and smart contracts using Solidity</span>
                  </li>
                  <li className="text-gray-300 flex items-start text-sm md:text-base">
                    <span className="text-green-400 mr-3 mt-1 flex-shrink-0">▹</span>
                    <span>Build full-stack web applications with modern frameworks</span>
                  </li>
                  <li className="text-gray-300 flex items-start text-sm md:text-base">
                    <span className="text-green-400 mr-3 mt-1 flex-shrink-0">▹</span>
                    <span>Contribute to open-source projects and educational platforms</span>
                  </li>
                  <li className="text-gray-300 flex items-start text-sm md:text-base">
                    <span className="text-green-400 mr-3 mt-1 flex-shrink-0">▹</span>
                    <span>Write technical articles and share knowledge on Medium</span>
                  </li>
                  <li className="text-gray-300 flex items-start text-sm md:text-base">
                    <span className="text-green-400 mr-3 mt-1 flex-shrink-0">▹</span>
                    <span>Collaborate with organizations like HDLGenHub and DeedLink</span>
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="right" delay={200}>
              <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                  Education
                </h3>
                <div className="space-y-2">
                  <p className="text-base md:text-lg text-gray-300 font-medium">
                    University of Ruhuna
                  </p>
                  <p className="text-sm md:text-base text-gray-400">
                    Faculty of Engineering, Department of Computer Engineering
                  </p>
                  <p className="text-green-400 text-xs md:text-sm mt-2">
                    4th Year Undergraduate (2021 - Present)
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Skills Section */}
          <div className="space-y-6">
            <ScrollAnimation direction="left">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Skills & Technologies
              </h3>
            </ScrollAnimation>
            
            {/* Skill Bars */}
            <ScrollAnimation direction="left" delay={100}>
              <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-green-400 mb-6">
                  Core Skills
                </h4>
                {skillLevels.map((skill, index) => (
                  <SkillBar
                    key={index}
                    skill={skill.skill}
                    level={skill.level}
                    delay={index * 100}
                  />
                ))}
              </div>
            </ScrollAnimation>

            {/* Skill Categories */}
            <div className="space-y-6">
              {skillCategories.map((category, categoryIndex) => (
                <ScrollAnimation
                  key={categoryIndex}
                  direction="left"
                  delay={(categoryIndex + 1) * 100 + 200}
                >
                  <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-green-400 mb-4">
                      {category.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

