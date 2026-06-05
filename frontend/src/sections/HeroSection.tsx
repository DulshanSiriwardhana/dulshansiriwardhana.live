import TypingAnimation from "../components/TypingAnimation";
import { personalInfo, contactLinks } from "../constants/landingPageData";
import profileImage from "../assets/images/dp.png";
import {
  Terminal,
  Briefcase,
  Mail,
  Share2,
  Globe,
  PenTool,
  UserPlus,
  MessageSquare,
  Code
} from "lucide-react";

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

  const getContactIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'github': return <Terminal size={20} className="text-white" />;
      case 'linkedin': return <Briefcase size={20} className="text-blue-500" />;
      case 'email': return <Mail size={20} className="text-blue-400" />;
      case 'facebook': return <Share2 size={20} className="text-blue-600" />;
      case 'website': return <Globe size={20} className="text-green-400" />;
      case 'medium': return <PenTool size={20} className="text-orange-400" />;
      default: return null;
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

          <p className="text-green-400 text-lg md:text-xl mb-4 animate-fade-in font-medium tracking-widest uppercase">
            System Identity: {personalInfo.firstName}
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight px-4 leading-tight">
            <span className="block text-white animate-slide-up bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 font-spectral italic">{personalInfo.firstName}</span>
            <span className="block text-green-400 mt-2 animate-slide-up-delayed font-black">
              {personalInfo.lastName}
            </span>
          </h1>

          <div className="h-12 md:h-16 flex items-center justify-center px-4">
            <p className="text-xl md:text-2xl lg:text-4xl font-light text-gray-300 text-center flex items-center gap-3">
              <span className="text-green-500/50 block md:hidden lg:block">&lt;</span>
              I'm a <TypingAnimation texts={typingTexts} />
              <span className="text-green-500/50 block md:hidden lg:block">/&gt;</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-green-400"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-green-400"></div>
          </div>

          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto mt-6 leading-relaxed">
            {personalInfo.bio}
          </p>

          <p className="text-base text-gray-500 italic max-w-xl mx-auto mt-4 font-spectral">
            "I just love to solve what I like!"
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 mt-12">
          <a
            href="#hire"
            onClick={(e) => handleSmoothScroll(e, "#hire")}
            className="group px-10 py-5 bg-green-500/10 border-2 border-green-500/60 rounded-2xl text-green-400 hover:bg-green-500 hover:text-black hover:scale-105 hover:shadow-2xl hover:shadow-green-500/40 active:scale-95 transition-all duration-500 font-bold relative overflow-hidden flex items-center gap-3 uppercase tracking-widest"
          >
            <UserPlus size={22} className="relative z-10" />
            <span className="relative z-10">Hire Me</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="px-10 py-5 bg-transparent border border-white/20 rounded-2xl text-gray-300 hover:border-white hover:text-white hover:scale-105 active:scale-95 transition-all duration-500 font-bold flex items-center gap-3 uppercase tracking-widest backdrop-blur-sm"
          >
            <MessageSquare size={22} />
            Get In Touch
          </a>
          <a
            href="#projects"
            onClick={(e) => handleSmoothScroll(e, "#projects")}
            className="px-10 py-5 bg-transparent border border-green-500/20 rounded-2xl text-green-500/80 hover:border-green-500 hover:text-green-400 hover:scale-105 active:scale-95 transition-all duration-500 font-bold flex items-center gap-3 uppercase tracking-widest"
          >
            <Code size={22} />
            View My Work
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target={link.type === "external" ? "_blank" : undefined}
              rel={link.type === "external" ? "noopener noreferrer" : undefined}
              className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-400 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/20 active:scale-90 transition-all duration-500 group"
              aria-label={link.label}
              title={link.label}
            >
              <div className="transition-transform duration-500 group-hover:scale-110">
                {getContactIcon(link.label) || <span>{link.label.charAt(0)}</span>}
              </div>
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 mt-20">
          <div className="flex flex-col items-center gap-2 animate-bounce cursor-pointer" onClick={(e) => {
            e.preventDefault();
            const about = document.getElementById('about');
            about?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <span className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">Scroll to explore</span>
            <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-transparent rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
