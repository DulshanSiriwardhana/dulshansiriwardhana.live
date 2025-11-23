import SectionTitle from "../components/SectionTitle";
import { personalInfo, skills } from "../constants/landingPageData";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 relative z-10"
    >
      <div className="max-w-4xl w-full space-y-12">
        <SectionTitle title="About Me" />

        <div className="space-y-8">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            {personalInfo.bio}
          </p>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

