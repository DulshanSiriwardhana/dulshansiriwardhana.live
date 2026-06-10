import React from "react";
import {
    Briefcase,
    GraduationCap,
    Code2,
    Mail,
    MapPin,
    Zap,
    ShieldCheck,
    Layers,
    Award,
    Terminal,
    Globe,
    Trophy,
    BookOpen,
    Star,
    ExternalLink,
    ChevronRight,
    Search,
    User,
    CheckCircle2,
    PenTool,
    Share2,
    Calendar,
    Phone
} from "lucide-react";
import {
    personalInfo,
    experience,
    skillCategories,
    skillLevels,
    achievements,
    blogArticles,
    projects,
    certificates,
    references,
    stats
} from "../../constants/landingPageData";

interface MinimalTemplateProps {
    t: any;
    c: string;
    colorMap: Record<string, string>;
}

const MinimalTemplate = React.forwardRef<HTMLDivElement, MinimalTemplateProps>(({ t, c, colorMap }, ref) => {
    return (
        <div
            ref={ref}
            id="cv-preview"
            className="bg-white text-slate-900 p-8 md:p-12 shadow-xl min-w-[320px] font-sans antialiased"
        >
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-8 mb-10" data-cv-section="header">
                <h1 className="text-5xl font-black tracking-tighter uppercase mb-4">{personalInfo.firstName} {personalInfo.lastName}</h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <span>{personalInfo.title}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full my-auto"></span>
                    <span>{personalInfo.location}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full my-auto"></span>
                    <span>{personalInfo.email}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-8 space-y-12">
                    {/* Summary */}
                    <section data-cv-section="summary">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Summary</h2>
                        <p className="text-lg font-medium leading-relaxed text-slate-800">
                            {personalInfo.bio}
                        </p>
                    </section>

                    {/* Experience */}
                    <section data-cv-section="experience">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Experience</h2>
                        <div className="space-y-10">
                            {experience.map((exp, index) => (
                                <div key={index} data-cv-section={`exp-${index}`}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-bold">{exp.position}</h3>
                                        <span className="text-sm font-bold text-slate-400">{exp.duration}</span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">{exp.company}</p>
                                    <ul className="space-y-2">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="text-sm text-slate-600 flex items-start gap-4">
                                                <span className="mt-2 w-1.5 h-px bg-slate-400 flex-shrink-0"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section data-cv-section="education">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Education</h2>
                        <div className="space-y-6">
                            <div data-cv-section="edu-1">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold">BSc. (Hons) in Computer Engineering</h3>
                                    <span className="text-sm font-bold text-slate-400">2020 - 2024</span>
                                </div>
                                <p className="text-sm text-slate-600">University of Ruhuna, Sri Lanka</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="md:col-span-4 space-y-12">
                    {/* Skills */}
                    <section data-cv-section="skills">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Skills</h2>
                        <div className="space-y-6">
                            {skillCategories.map((cat, i) => (
                                <div key={i}>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-2">{cat.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.skills.map((s, j) => (
                                            <span key={j} className="text-[10px] font-bold border border-slate-200 px-2 py-1 rounded text-slate-600 uppercase">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Achievements */}
                    <section data-cv-section="achievements">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Achievements</h2>
                        <div className="space-y-4">
                            {achievements.slice(0, 3).map((ach, index) => (
                                <div key={index} data-cv-section={`ach-${index}`}>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-800">{ach.title}</h3>
                                    <p className="text-[10px] text-slate-500 font-bold">{ach.date}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Online */}
                    <section data-cv-section="online">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Presence</h2>
                        <div className="space-y-3">
                            <a href="#" className="flex items-center gap-3 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-widest">
                                <Linkedin size={14} /> LinkedIn
                            </a>
                            <a href="#" className="flex items-center gap-3 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-widest">
                                <Github size={14} /> GitHub
                            </a>
                            <a href="#" className="flex items-center gap-3 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-widest">
                                <Globe size={14} /> Website
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
});

// Needed for Lucide-react components if they are not imported correctly in child files
const Linkedin = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default MinimalTemplate;
