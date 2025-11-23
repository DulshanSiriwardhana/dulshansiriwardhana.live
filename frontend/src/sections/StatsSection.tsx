import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import AnimatedCounter from "../components/AnimatedCounter";
import { stats } from "../constants/landingPageData";

const StatsSection = () => {
  return (
    <section
      id="stats"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10 bg-gradient-to-b from-black via-[#0a0a0a] to-black"
    >
      <div className="max-w-6xl w-full space-y-12">
        <SectionTitle
          title="Achievements"
          subtitle="Numbers that speak for themselves"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {stats.map((stat, index) => (
            <ScrollAnimation key={index} delay={index * 100} direction="up">
              <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 md:p-8 text-center hover:border-green-500/50 hover:bg-[#1a1a1a]/70 transition-all duration-300 group h-full flex flex-col justify-center min-h-[200px]">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">{stat.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

