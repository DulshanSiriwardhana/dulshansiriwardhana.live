import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import { achievements } from "../constants/landingPageData";

const AchievementsSection = () => {
  return (
    <section
      id="achievements"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10 bg-gradient-to-b from-black via-[#0a0a0a] to-black"
    >
      <div className="max-w-6xl w-full space-y-12">
        <SectionTitle
          title="Achievements & Certifications"
          subtitle="Milestones and recognitions in my journey"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {achievements.map((achievement, index) => (
            <ScrollAnimation key={index} delay={index * 100} direction="up">
              <div className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/50 hover:bg-[#1a1a1a]/70 transition-all duration-300 h-full flex flex-col">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon || "🏆"}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-green-400 text-sm mb-2">{achievement.issuer}</p>
                <p className="text-gray-400 text-sm mb-3">{achievement.date}</p>
                <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                  {achievement.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;

