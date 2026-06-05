import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import SkillBar from "../components/SkillBar";
import { personalInfo, skillCategories, skillLevels } from "../constants/landingPageData";
import profileImage from "../assets/images/dp.png";
import {
  User,
  Workflow,
  GraduationCap,
  Cpu,
  Binary,
  Globe,
  Award,
  CircleCheckBig
} from "lucide-react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-6xl w-full space-y-12">
        <SectionTitle title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <ScrollAnimation direction="right">
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-xl opacity-20"></div>
                  <img
                    src={profileImage}
                    alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                    className="relative w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-green-500/50 shadow-2xl"
                  />
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center border-2 border-black shadow-xl animate-bounce">
                    <User className="text-black" size={24} />
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="bg-[#111]/80 backdrop-blur-md border border-green-500/20 rounded-3xl p-8 hover:border-green-500/50 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <User className="text-green-500" size={24} />
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                    Personal Identity
                  </h3>
                </div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed font-spectral italic">
                  {personalInfo.bio}
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={100}>
              <div className="bg-[#111]/80 backdrop-blur-md border border-green-500/20 rounded-3xl p-8 hover:border-green-500/50 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <Workflow className="text-blue-500" size={24} />
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                    System Operations
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Develop scalable web features and Web3 applications (Next.js, Wagmi)",
                    "Architect high-performance systems and C++ AI engines",
                    "Design and implement microservices and blockchain ecosystems",
                    "Contribute to major open-source projects with 3800+ commits",
                    "Winner and Top-tier competitor in national coding and innovation trials"
                  ].map((item, i) => (
                    <li key={i} className="text-gray-300 flex items-start text-sm md:text-base group/item">
                      <CircleCheckBig className="text-green-500 mr-4 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" size={18} />
                      <span className="group-hover/item:text-green-400 transition-colors font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={200}>
              <div className="bg-[#111]/80 backdrop-blur-md border border-green-500/20 rounded-3xl p-8 hover:border-green-500/50 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="text-yellow-500" size={24} />
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                    Academic Record
                  </h3>
                </div>
                <div className="space-y-3 p-4 bg-black/40 rounded-2xl border border-white/5">
                  <p className="text-lg text-white font-bold">
                    University of Ruhuna
                  </p>
                  <p className="text-sm text-gray-300 font-medium">
                    Faculty of Engineering, Computer Engineering
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-green-400 text-[10px] uppercase font-bold tracking-widest">
                      L4: Senior Undergraduate
                    </div>
                    <span className="text-gray-600 text-xs font-mono">2021 - PRESENT</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <div className="space-y-6">
            <ScrollAnimation direction="left">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="text-purple-500" size={28} />
                <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">
                  Tech Stack
                </h3>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="left" delay={100}>
              <div className="bg-[#111]/80 backdrop-blur-md border border-green-500/20 rounded-3xl p-8 hover:border-green-500/50 transition-all duration-500">
                <h4 className="text-sm font-bold text-green-500/60 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                  <Binary size={16} />
                  Algorithm Proficiency
                </h4>
                <div className="space-y-1">
                  {skillLevels.map((skill, index) => (
                    <SkillBar
                      key={index}
                      skill={skill.skill}
                      level={skill.level}
                      delay={index * 100}
                    />
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            <div className="space-y-6">
              {skillCategories.map((category, categoryIndex) => (
                <ScrollAnimation
                  key={categoryIndex}
                  direction="left"
                  delay={(categoryIndex + 1) * 100 + 200}
                >
                  <div className="bg-[#111]/80 backdrop-blur-md border border-green-500/20 rounded-3xl p-8 hover:border-green-500/50 transition-all duration-500 group">
                    <h4 className="text-sm font-bold text-green-400 mb-6 uppercase tracking-[0.3em] flex items-center gap-2">
                      {categoryIndex === 0 ? <Globe size={16} className="text-blue-400" /> : <Award size={16} className="text-yellow-400" />}
                      {category.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-4 py-2 bg-green-500/5 border border-green-500/10 rounded-xl text-green-400/80 text-xs font-bold tracking-tight hover:bg-green-500/20 hover:border-green-500/50 hover:text-white hover:-translate-y-1 transition-all duration-300 cursor-default"
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
