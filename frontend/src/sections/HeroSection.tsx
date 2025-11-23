import NavigationButton from "../components/NavigationButton";
import { personalInfo, navigationLinks } from "../constants/landingPageData";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10"
    >
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="block text-white">{personalInfo.firstName}</span>
            <span className="block text-green-400 mt-2">
              {personalInfo.lastName}
            </span>
          </h1>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-green-400"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-green-400"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
            {personalInfo.title}
          </p>
        </div>

        {/* Navigation/Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {navigationLinks.map((link) => (
            <NavigationButton key={link.href} href={link.href} label={link.label} />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 mt-16 animate-bounce">
          <span className="text-sm text-gray-500">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

