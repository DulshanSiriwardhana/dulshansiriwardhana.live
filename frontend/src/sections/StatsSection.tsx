import SectionTitle from "../components/SectionTitle";
import AnimatedCounter from "../components/AnimatedCounter";
import { stats } from "../constants/landingPageData";

const StatsSection = () => {
  return (
    <section
      id="stats"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 relative z-10 bg-gradient-to-b from-black via-[#0a0a0a] to-black"
    >
      <div className="max-w-6xl w-full space-y-12">
        <SectionTitle
          title="Achievements"
          subtitle="Numbers that speak for themselves"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 text-center hover:border-green-500/50 hover:bg-[#1a1a1a]/70 transition-all duration-300 group"
            >
              <div className="text-5xl md:text-6xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-400 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

