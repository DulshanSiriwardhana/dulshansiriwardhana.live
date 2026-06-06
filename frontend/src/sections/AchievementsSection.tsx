import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import { achievements } from "../constants/landingPageData";
import { Award, Trophy, Medal, Star, ShieldCheck, Cpu } from "lucide-react";

const AchievementsSection = () => {
  const getAchievementIcon = (index: number) => {
    const icons = [
      <Trophy size={32} className="text-yellow-400" />,
      <Medal size={32} className="text-blue-400" />,
      <Award size={32} className="text-green-400" />,
      <ShieldCheck size={32} className="text-purple-400" />,
      <Star size={32} className="text-orange-400" />,
      <Cpu size={32} className="text-blue-500" />,
    ];
    return icons[index % icons.length];
  };

  return (
    <section
      id="achievements"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-[1440px] w-full space-y-12">
        <SectionTitle
          title="Recognition Hub"
          subtitle="Milestones and professional certifications validated by global entities"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {achievements.map((achievement, index) => (
            <ScrollAnimation key={index} delay={index * 100} direction="up">
              <div className="group bg-[#111]/90 backdrop-blur-md border border-green-500/10 rounded-3xl p-8 hover:border-green-500/50 hover:bg-[#1a1a1a]/80 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 h-full flex flex-col min-h-[320px] relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/15 transition-all duration-500"></div>

                <div className="mb-6 p-4 bg-white/5 rounded-2xl inline-block group-hover:scale-110 group-hover:bg-green-500/10 transition-all duration-500 relative z-10">
                  {getAchievementIcon(index)}
                </div>

                <div className="relative z-10 space-y-4 flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors uppercase tracking-tight leading-tight">
                      {achievement.title}
                    </h3>
                    <p className="text-green-400 text-xs font-bold uppercase tracking-[0.2em]">{achievement.issuer}</p>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-white/5 w-fit">
                    {achievement.date}
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed font-medium">
                    {achievement.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Protocol Verified</span>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
