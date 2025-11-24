import TypingAnimation from "../components/TypingAnimation";
import { personalInfo, contactLinks } from "../constants/landingPageData";
import profileImage from "../assets/images/dp.png";

const HeroSection = () => {
  const typingTexts = [
    "Blockchain Developer",
    "Full-Stack Developer",
    "Computer Engineering Student",
    "Problem Solver",
    "Code Enthusiast",
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center p-4 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-5xl w-full space-y-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <img
                src={profileImage}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-green-500/50 shadow-2xl"
              />
            </div>
          </div>

          <p className="text-green-400 text-lg md:text-xl mb-4 animate-fade-in">
            Hi, my name is
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight px-4">
            <span className="block text-white animate-slide-up">{personalInfo.firstName}</span>
            <span className="block text-green-400 mt-2 animate-slide-up-delayed">
              {personalInfo.lastName}
            </span>
          </h1>

          <div className="h-12 md:h-16 flex items-center justify-center px-4">
            <p className="text-xl md:text-2xl lg:text-4xl font-light text-gray-300 text-center">
              I'm a <TypingAnimation texts={typingTexts} />
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-green-400"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-green-400"></div>
          </div>

          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto mt-6">
            {personalInfo.bio}
          </p>
          
          <p className="text-base text-gray-500 italic max-w-xl mx-auto mt-4">
            "I just love to solve what I like!"
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="px-8 py-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30 hover:border-green-500 hover:scale-105 transition-all duration-300 font-medium"
          >
            Get In Touch
          </a>
          <a
            href="#projects"
            onClick={(e) => handleSmoothScroll(e, "#projects")}
            className="px-8 py-4 bg-transparent border border-gray-600 rounded-lg text-gray-300 hover:border-green-500/50 hover:text-green-400 hover:scale-105 transition-all duration-300 font-medium"
          >
            View My Work
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target={link.type === "external" ? "_blank" : undefined}
              rel={link.type === "external" ? "noopener noreferrer" : undefined}
              className="w-12 h-12 flex items-center justify-center bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 hover:border-green-500/50 hover:scale-110 transition-all duration-300"
              aria-label={link.label}
              title={link.label}
            >
              {link.icon || link.label.charAt(0)}
            </a>
          ))}
        </div>

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

