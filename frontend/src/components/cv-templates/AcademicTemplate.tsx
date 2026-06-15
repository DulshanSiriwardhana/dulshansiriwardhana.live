import React from "react";
import {
    Mail,
    MapPin,
    Phone,
    Globe,
    BookOpen,
    ShieldCheck,
    CheckCircle2
} from "lucide-react";
import {
    personalInfo,
    experience,
    skillCategories,
    blogArticles,
    certificates
} from "../../constants/landingPageData";

interface AcademicTemplateProps {
    t: any;
    c: string;
    colorMap: Record<string, string>;
}

const AcademicTemplate = React.forwardRef<HTMLDivElement, AcademicTemplateProps>(({ t, c, colorMap }, ref) => {
    const accentColor = colorMap[c] || "#1e40af";

    return (
        <div
            ref={ref}
            id="cv-preview"
            className={`${t.backgroundColor} ${t.textColor} p-12 md:p-20 shadow-2xl min-w-[320px] font-sans leading-relaxed`}
        >
            {/* Academic Header */}
            <header style={{ borderColor: accentColor }} className="border-b-2 pb-12 mb-16" data-cv-section="header">
                <h1 className={`text-4xl md:text-5xl font-serif font-black ${t.textColor} mb-6 tracking-tight`}>
                    {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p style={{ borderLeftColor: accentColor }} className={`text-lg font-serif italic ${t.mutedTextColor} mb-8 border-l-4 pl-6 py-1`}>
                    {personalInfo.title} • Engineering Researcher & Full-Stack Architect
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-3"><MapPin size={16} /> {personalInfo.location}</span>
                    <span className="flex items-center gap-3"><Mail size={16} /> {personalInfo.email}</span>
                    <span className="flex items-center gap-3"><Phone size={16} /> {personalInfo.phone}</span>
                    <span className="flex items-center gap-3"><Globe size={16} /> {personalInfo.website}</span>
                </div>
            </header>

            <div className="space-y-16">
                {/* Executive Summary */}
                <section data-cv-section="summary">
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900 mb-6 border-b border-gray-100 pb-2">I. Professional Synopsis</h2>
                    <p className="text-lg text-gray-700 leading-relaxed font-serif italic">
                        {personalInfo.bio} Focused on the formalization of scalable system architectures and the practical application of advanced engineering principles in distributed environments.
                    </p>
                </section>

                {/* Education */}
                <section data-cv-section="education">
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900 mb-8 border-b border-gray-100 pb-2">II. Academic Background</h2>
                    <div className="space-y-8">
                        <div data-cv-section="edu-1">
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-xl font-bold text-gray-900">Bachelor of Science (Hons) in Computer Engineering</h3>
                                <span className="text-sm font-bold text-gray-500 italic">2020 - 2024</span>
                            </div>
                            <p className="text-md font-medium text-gray-700 uppercase tracking-tight mb-4">University of Ruhuna, Sri Lanka</p>
                            <div className="bg-gray-50 p-6 border-l-4 border-gray-900 space-y-3">
                                <p className="text-sm"><strong>Academic Standing:</strong> GPA 3.3 / 4.0</p>
                                <p className="text-sm"><strong>Specializations:</strong> Distributed Systems, High-Performance Computing, Artificial Intelligence.</p>
                                <p className="text-sm italic text-gray-500">Thesis focus on architectural efficiency and system optimization.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience */}
                <section data-cv-section="experience">
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900 mb-8 border-b border-gray-100 pb-2">III. Professional Experience</h2>
                    <div className="space-y-12">
                        {experience.map((exp, index) => (
                            <div key={index} data-cv-section={`exp-${index}`} className="group">
                                <div className="flex justify-between items-baseline mb-3">
                                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight underline decoration-gray-200 underline-offset-8">{exp.company}</h3>
                                    <span className="text-sm font-bold text-gray-400 italic">{exp.duration}</span>
                                </div>
                                <p className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6 italic">{exp.position}</p>
                                <ul className="space-y-3 pl-8 list-none">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="text-sm text-gray-600 leading-relaxed flex items-start gap-4">
                                            <CheckCircle2 size={14} className="mt-1 text-gray-300 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Publications */}
                    <section data-cv-section="publications">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900 mb-8 border-b border-gray-100 pb-2">IV. Publications & Content</h2>
                        <div className="space-y-8">
                            {blogArticles.map((art, index) => (
                                <div key={index} className="space-y-2 group">
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-gray-50 text-gray-400 rounded group-hover:text-gray-900 transition-colors"><BookOpen size={16} /></div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 leading-snug">{art.title}</h4>
                                            <p className="text-[10px] text-gray-400 uppercase font-black mt-1 tracking-widest">Article / Academic Insight</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 italic pl-10">{art.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Certifications */}
                    <section data-cv-section="certificates">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900 mb-8 border-b border-gray-100 pb-2">V. Certifications</h2>
                        <div className="space-y-6">
                            {certificates.slice(0, 5).map((cert, index) => (
                                <div key={index} className="flex gap-4 items-start group">
                                    <div className="p-2 bg-gray-50 text-gray-400 rounded group-hover:text-gray-900 transition-colors"><ShieldCheck size={16} /></div>
                                    <div>
                                        <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{cert.title}</h4>
                                        <p className="text-[10px] text-gray-500 italic mt-1">{cert.issuer} • {cert.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Skills */}
                <section data-cv-section="skills">
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900 mb-8 border-b border-gray-100 pb-2">VI. Core Competencies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {skillCategories.map((cat, i) => (
                            <div key={i} className="space-y-4">
                                <h3 className="text-[10px] font-black underline underline-offset-4 decoration-2 decoration-gray-200 uppercase tracking-widest text-gray-900">{cat.category}</h3>
                                <ul className="space-y-2">
                                    {cat.skills.map((skillItem, j) => (
                                        <li key={j} className="text-xs text-gray-600 font-medium italic">• {skillItem}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <footer className="mt-20 pt-8 border-t border-gray-100 text-center">
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.5em]">Academic Protocol & Professional Record</p>
            </footer>
        </div>
    );
});

export default AcademicTemplate;
