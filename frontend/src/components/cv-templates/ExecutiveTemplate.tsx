import React from "react";
import {
    Briefcase,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    Globe,
    Trophy,
    ShieldCheck
} from "lucide-react";
import {
    personalInfo,
    experience,
    skillCategories,
    achievements,
    certificates
} from "../../constants/landingPageData";

interface ExecutiveTemplateProps {
    t: any;
    c: string;
    colorMap: Record<string, string>;
}

const ExecutiveTemplate = React.forwardRef<HTMLDivElement, ExecutiveTemplateProps>((_props, ref) => {
    return (
        <div
            ref={ref}
            id="cv-preview"
            className="bg-[#fcfcfc] text-slate-800 p-12 md:p-20 shadow-2xl min-w-[320px] font-serif leading-relaxed"
        >
            {/* Header */}
            <div className="text-center mb-16 border-b border-slate-200 pb-12" data-cv-section="header">
                <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">{personalInfo.firstName} {personalInfo.lastName}</h1>
                <p className="text-xl font-medium text-slate-500 uppercase tracking-[0.2em] mb-8 italic">{personalInfo.title}</p>

                <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-sans text-slate-600 font-medium italic">
                    <span className="flex items-center gap-2"><MapPin size={14} /> {personalInfo.location}</span>
                    <span className="flex items-center gap-2"><Mail size={14} /> {personalInfo.email}</span>
                    <span className="flex items-center gap-2"><Phone size={14} /> {personalInfo.phone}</span>
                    <span className="flex items-center gap-2"><Globe size={14} /> {personalInfo.website}</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-16 font-sans">
                {/* Profile */}
                <section data-cv-section="summary">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6 flex items-center gap-4">
                        Professional Profile <div className="h-px flex-1 bg-slate-200"></div>
                    </h2>
                    <p className="text-lg text-slate-700 leading-extended font-serif italic text-justify">
                        {personalInfo.bio} A results-driven engineering professional with a proven track record in architecting high-performance distributed systems, optimizing cross-continental infrastructures, and leading end-to-end technical lifecycles with surgical precision.
                    </p>
                </section>

                {/* Experience */}
                <section data-cv-section="experience">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-10 flex items-center gap-4">
                        Career Trajectory <div className="h-px flex-1 bg-slate-200"></div>
                    </h2>
                    <div className="space-y-12">
                        {experience.map((exp, index) => (
                            <div key={index} data-cv-section={`exp-${index}`} className="group">
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className="text-2xl font-bold text-slate-900">{exp.company}</h3>
                                    <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{exp.duration}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 font-bold uppercase tracking-wider text-sm mb-6 italic">
                                    <Briefcase size={16} />
                                    {exp.position}
                                </div>
                                <ul className="space-y-3 ml-1 border-l-2 border-slate-100 pl-8">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="text-slate-600 leading-relaxed text-sm relative">
                                            <div className="absolute -left-[35px] top-2.5 w-1.5 h-px bg-slate-200 rounded-full group-hover:bg-slate-400 transition-colors"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Skills */}
                    <section data-cv-section="skills">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-4">
                            Core Competencies <div className="h-px flex-1 bg-slate-200"></div>
                        </h2>
                        <div className="space-y-6">
                            {skillCategories.map((cat, i) => (
                                <div key={i} className="space-y-2">
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">{cat.category}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed italic">{cat.skills.join(' • ')}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section data-cv-section="education" className="space-y-12">
                        <div>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-4">
                                Academic Credentials <div className="h-px flex-1 bg-slate-200"></div>
                            </h2>
                            <div className="space-y-8">
                                <div data-cv-section="edu-1">
                                    <h3 className="text-lg font-bold text-slate-900">BSc. (Hons) in Computer Engineering</h3>
                                    <p className="text-sm font-bold text-slate-500 uppercase mt-1">University of Ruhuna, Sri Lanka</p>
                                    <div className="flex items-center gap-2 mt-3 text-xs font-black text-slate-400 uppercase tracking-tighter">
                                        <GraduationCap size={14} /> GPA 3.3 • 2020 - 2024
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Awards */}
                        <div data-cv-section="awards">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-4">
                                Distinctions <div className="h-px flex-1 bg-slate-200"></div>
                            </h2>
                            <div className="space-y-4">
                                {achievements.slice(0, 2).map((ach, index) => (
                                    <div key={index} className="flex gap-4">
                                        <Trophy size={18} className="text-slate-300 flex-shrink-0" />
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-800 uppercase">{ach.title}</h4>
                                            <p className="text-xs text-slate-500 italic">{ach.issuer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Certificates */}
                <section data-cv-section="certificates">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-4">
                        Industry Certifications <div className="h-px flex-1 bg-slate-200"></div>
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {certificates.slice(0, 4).map((cert, index) => (
                            <div key={index} className="text-center p-4 border border-slate-100 rounded-lg hover:border-slate-200 transition-colors">
                                <ShieldCheck size={20} className="text-slate-300 mx-auto mb-3" />
                                <h4 className="text-[10px] font-black text-slate-800 uppercase leading-tight mb-1">{cert.title}</h4>
                                <p className="text-[10px] text-slate-400 italic">{cert.issuer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Electronically Generated Professional Dossier</p>
            </div>
        </div>
    );
});

export default ExecutiveTemplate;
