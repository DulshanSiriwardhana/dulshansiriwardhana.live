import { useState, useRef } from "react";
import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import {
    Briefcase,
    GraduationCap,
    Code2,
    Mail,
    MapPin,
    Github,
    Linkedin,
    Zap,
    ShieldCheck,
    Layers,
    Download,
    Send,
    Award,
    Terminal,
    Globe
} from "lucide-react";
import {
    personalInfo,
    experience,
    skillCategories,
    skillLevels,
} from "../constants/landingPageData";

const HireMeSection = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const cvRef = useRef<HTMLDivElement>(null);

    const handleDownloadCV = () => {
        setIsGenerating(true);
        setTimeout(() => {
            window.print();
            setIsGenerating(false);
        }, 300);
    };

    const handleSmoothScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <>
            <section
                id="hire"
                className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10"
            >
                <div className="max-w-6xl w-full space-y-10">
                    <SectionTitle
                        title="Hire Me"
                        subtitle="Open to new opportunities — let's build something great together"
                    />

                    <ScrollAnimation direction="up">
                        <div className="relative overflow-hidden bg-gradient-to-r from-green-500/10 via-green-600/5 to-green-500/10 border border-green-500/30 rounded-2xl p-6 md:p-8">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                                        <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-30"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                                            Available for Hire
                                        </h3>
                                        <p className="text-gray-400 text-sm md:text-base mt-1">
                                            Full-time • Contract • Freelance • Remote
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="#contact"
                                        onClick={(e) => handleSmoothScroll(e, "#contact")}
                                        className="px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30 hover:border-green-500 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 active:scale-100 transition-all duration-300 font-semibold text-sm md:text-base flex items-center gap-2"
                                    >
                                        <Send size={18} className="text-green-400" />
                                        Contact Me
                                    </a>
                                    <button
                                        onClick={handleDownloadCV}
                                        disabled={isGenerating}
                                        className="px-6 py-3 bg-transparent border border-gray-600 rounded-lg text-gray-300 hover:border-green-500/50 hover:text-green-400 hover:scale-105 hover:bg-green-500/10 active:scale-100 transition-all duration-300 font-semibold text-sm md:text-base disabled:opacity-50 flex items-center gap-2"
                                    >
                                        <Download size={18} className={isGenerating ? "animate-bounce" : ""} />
                                        {isGenerating ? "Generating..." : "Download CV"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation direction="up" delay={100}>
                        <div
                            ref={cvRef}
                            id="cv-preview"
                            className="bg-[#0d0d0d] border border-green-500/20 rounded-2xl overflow-hidden hover:border-green-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10"
                        >
                            <div className="bg-gradient-to-r from-green-500/10 via-[#111] to-green-500/10 border-b border-green-500/20 p-6 md:p-8">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border-2 border-green-500/40 flex items-center justify-center text-4xl md:text-5xl flex-shrink-0 overflow-hidden">
                                        <img
                                            src="/mine.png"
                                            alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                                            {personalInfo.firstName} {personalInfo.lastName}
                                        </h2>
                                        <p className="text-green-400 font-medium text-lg mt-1">
                                            {personalInfo.title}
                                        </p>
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-gray-400 font-medium">
                                            <span className="flex items-center gap-2">
                                                <MapPin size={14} className="text-red-400" />
                                                {personalInfo.location}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Mail size={14} className="text-blue-400" />
                                                {personalInfo.email}
                                            </span>
                                            <a
                                                href="https://github.com/DulshanSiriwardhana"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 hover:text-green-400 transition-colors"
                                            >
                                                <Github size={14} className="text-white" />
                                                GitHub
                                            </a>
                                            <a
                                                href="https://linkedin.com/in/dulshan-siriwardhana-17b77521a"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 hover:text-green-400 transition-colors"
                                            >
                                                <Linkedin size={14} className="text-blue-500" />
                                                LinkedIn
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8 space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-3">
                                        <Terminal size={20} className="text-green-500" />
                                        PROFESSIONAL SUMMARY
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                        {personalInfo.bio} Experienced in developing blockchain
                                        applications, full-stack web solutions, and contributing to
                                        open-source projects. Strong foundation in computer
                                        engineering with hands-on experience in Solidity, React,
                                        Node.js, and cloud technologies.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-3">
                                            <Briefcase size={20} className="text-orange-400" />
                                            EXPERIENCE
                                        </h3>
                                        <div className="space-y-6">
                                            {experience.map((exp, index) => (
                                                <div
                                                    key={index}
                                                    className="relative pl-6 border-l-2 border-green-500/20 hover:border-green-500/50 transition-colors duration-300"
                                                >
                                                    <div className="absolute left-[-5px] top-1.5 w-2 h-2 bg-green-400 rounded-full"></div>
                                                    <h4 className="text-white font-semibold text-sm md:text-base">
                                                        {exp.position}
                                                    </h4>
                                                    <p className="text-green-400/80 text-sm font-medium">
                                                        {exp.company}
                                                    </p>
                                                    <p className="text-gray-500 text-xs mt-0.5">
                                                        {exp.duration}
                                                    </p>
                                                    <ul className="mt-3 space-y-2">
                                                        {exp.description.slice(0, 2).map((item, i) => (
                                                            <li
                                                                key={i}
                                                                className="text-gray-400 text-xs md:text-sm flex items-start gap-2"
                                                            >
                                                                <span className="text-green-500/60 mt-1 flex-shrink-0">
                                                                    <div className="w-1.5 h-1.5 bg-green-500/40 rounded-full" />
                                                                </span>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-3">
                                                <GraduationCap size={22} className="text-yellow-400" />
                                                EDUCATION
                                            </h3>
                                            <div className="bg-[#111]/50 border border-green-500/10 rounded-xl p-5 hover:border-green-500/30 transition-all group">
                                                <h4 className="text-white font-bold group-hover:text-green-400 transition-colors">
                                                    University of Ruhuna
                                                </h4>
                                                <p className="text-gray-300 text-sm mt-1 font-medium">
                                                    B.Sc. Eng. in Computer Engineering
                                                </p>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    Faculty of Engineering • 2021 - Present
                                                </p>
                                                <div className="flex items-center gap-2 mt-3">
                                                    <Award size={14} className="text-green-500" />
                                                    <p className="text-green-400/90 text-[10px] uppercase font-bold tracking-widest">
                                                        4th Year Undergraduate
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-3">
                                                <Code2 size={20} className="text-purple-400" />
                                                TECHNICAL PROFICIENCY
                                            </h3>
                                            <div className="space-y-4">
                                                {skillLevels.slice(0, 6).map((skill, index) => (
                                                    <div key={index} className="group">
                                                        <div className="flex justify-between text-xs mb-1.5">
                                                            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                                                                {skill.skill}
                                                            </span>
                                                            <span className="text-green-400/80 font-bold">
                                                                {skill.level}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-2 bg-black/40 border border-white/5 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-green-600 via-green-400 to-green-300 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(34,197,94,0.3)]"
                                                                style={{ width: `${skill.level}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="grid grid-cols-1 gap-4">
                                                {skillCategories.map((cat, index) => (
                                                    <div key={index} className="bg-black/20 p-4 rounded-xl border border-white/5">
                                                        <p className="text-[10px] text-gray-500 font-bold mb-3 uppercase tracking-[0.2em] flex items-center gap-2">
                                                            <Layers size={12} className="text-green-500/50" />
                                                            {cat.category}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {cat.skills.map((skill, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-3 py-1 bg-green-500/5 border border-green-500/10 rounded-lg text-xs text-green-400/90 font-medium hover:border-green-500/30 transition-all hover:bg-green-500/10 cursor-default"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                        {[
                            {
                                title: "Fast Turnaround",
                                desc: "Efficient development workflow with clean, maintainable code delivered on schedule.",
                                icon: <Zap className="text-yellow-400" size={24} />
                            },
                            {
                                title: "Blockchain Core",
                                desc: "Smart contract development with Solidity, DApp architecture, and Web3 integration.",
                                icon: <Globe className="text-blue-400" size={24} />
                            },
                            {
                                title: "Architecture Plus",
                                desc: "End-to-end development from React frontends to Node.js APIs and cloud deployment.",
                                icon: <ShieldCheck className="text-green-400" size={24} />
                            },
                        ].map((item, index) => (
                            <ScrollAnimation key={index} direction="up" delay={index * 100 + 200}>
                                <div className="group bg-[#111]/80 backdrop-blur-md border border-green-500/10 rounded-2xl p-8 hover:border-green-500/40 hover:bg-[#1a1a1a]/60 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2 h-full">
                                    <div className="mb-6 p-3 bg-white/5 rounded-xl inline-block group-hover:scale-110 group-hover:bg-green-500/10 transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors uppercase tracking-tight">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>
                            </ScrollAnimation>
                        ))}
                    </div>

                    <ScrollAnimation direction="up" delay={300}>
                        <div className="text-center space-y-6 pt-10">
                            <p className="text-gray-300 text-lg md:text-xl font-medium">
                                Ready to scale your next big idea? Let's initiate the session.
                            </p>
                            <div className="flex flex-wrap justify-center gap-5">
                                <a
                                    href="#contact"
                                    onClick={(e) => handleSmoothScroll(e, "#contact")}
                                    className="group px-8 py-4 bg-green-500/10 border border-green-500/40 rounded-xl text-green-400 hover:bg-green-500 hover:text-black hover:scale-105 active:scale-95 transition-all duration-500 font-bold uppercase tracking-widest flex items-center gap-3"
                                >
                                    <Send size={20} />
                                    Initiate Discussion
                                </a>
                                <a
                                    href={`mailto:${personalInfo.email}?subject=Job Opportunity&body=Hi Dulshan,%0D%0A%0D%0AI came across your portfolio and I'd like to discuss a potential opportunity.%0D%0A%0D%0ABest regards`}
                                    className="px-8 py-4 bg-transparent border border-gray-700 rounded-xl text-gray-400 hover:border-white hover:text-white hover:scale-105 active:scale-95 transition-all duration-500 font-bold uppercase tracking-widest flex items-center gap-3"
                                >
                                    <Mail size={20} />
                                    Direct Terminal
                                </a>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            </section>

            <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-preview, #cv-preview * {
            visibility: visible !important;
          }
          #cv-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          #cv-preview * {
            color: #111 !important;
            border-color: #ddd !important;
            background: white !important;
          }
          #cv-preview h2, #cv-preview h3, #cv-preview h4 {
            color: #111 !important;
          }
          #cv-preview .text-green-400,
          #cv-preview .text-green-400\\/80,
          #cv-preview .text-green-400\\/70 {
            color: #166534 !important;
          }
          #cv-preview .text-gray-400,
          #cv-preview .text-gray-500,
          #cv-preview .text-gray-300 {
            color: #444 !important;
          }
          #cv-preview .bg-gradient-to-r {
            background: #f8f8f8 !important;
          }
          @page {
            margin: 0.5cm;
            size: A4;
          }
        }
      `}</style>
        </>
    );
};

export default HireMeSection;
