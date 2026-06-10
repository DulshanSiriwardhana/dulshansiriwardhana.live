import React from "react";
import {
    Briefcase,
    Terminal,
    Globe
} from "lucide-react";
import {
    personalInfo,
    experience,
    skillCategories
} from "../../constants/landingPageData";

interface MinimalTemplateProps {
    t: any;
    c: string;
    colorMap: Record<string, string>;
}

const MinimalTemplate = React.forwardRef<HTMLDivElement, MinimalTemplateProps>((_props, ref) => {
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
                            {personalInfo.bio} Professional Full-Stack Engineer with a deep focus on performance optimization, distributed systems, and modern architectural patterns. Expert in delivering high-fidelity user experiences and robust backend infrastructures.
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
                                    <span className="text-sm font-bold text-slate-400">{experience[1].duration}</span>
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

                    {/* Online */}
                    <section data-cv-section="online">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Presence</h2>
                        <div className="space-y-3">
                            <a href="https://linkedin.com/in/dulshans" target="_blank" className="cv-link flex items-center gap-3 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-widest">
                                <Briefcase size={14} /> LinkedIn
                            </a>
                            <a href="https://github.com/DulshanSiriwardhana" target="_blank" className="cv-link flex items-center gap-3 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-widest">
                                <Terminal size={14} /> GitHub
                            </a>
                            <a href={`https://${personalInfo.website}`} target="_blank" className="cv-link flex items-center gap-3 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-widest">
                                <Globe size={14} /> Website
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
});

export default MinimalTemplate;
