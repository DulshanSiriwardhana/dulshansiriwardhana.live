import React from "react";
import {
    Mail,
    MapPin,
    Phone,
    Globe,
    Award
} from "lucide-react";
import {
    personalInfo,
    experience,
    skillCategories,
    achievements
} from "../../constants/landingPageData";

interface ElegantTemplateProps {
    t: any;
    c: string;
    colorMap: Record<string, string>;
}

const ElegantTemplate = React.forwardRef<HTMLDivElement, ElegantTemplateProps>((_props, ref) => {
    return (
        <div
            ref={ref}
            id="cv-preview"
            className="bg-white text-gray-700 p-12 md:p-24 shadow-2xl min-w-[320px] font-sans antialiased"
        >
            {/* Elegant Header */}
            <header className="text-center space-y-8 mb-20" data-cv-section="header">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-gray-900 uppercase">
                        {personalInfo.firstName} <span className="font-bold">{personalInfo.lastName}</span>
                    </h1>
                    <div className="h-0.5 w-20 bg-gray-900 mx-auto"></div>
                    <p className="text-sm font-bold tracking-[0.4em] text-gray-500 uppercase">{personalInfo.title}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-3"><MapPin size={14} className="text-gray-300" /> {personalInfo.location}</span>
                    <span className="flex items-center gap-3"><Mail size={14} className="text-gray-300" /> {personalInfo.email}</span>
                    <span className="flex items-center gap-3"><Phone size={14} className="text-gray-300" /> {personalInfo.phone}</span>
                    <span className="flex items-center gap-3"><Globe size={14} className="text-gray-300" /> {personalInfo.website}</span>
                </div>
            </header>

            <div className="max-w-4xl mx-auto space-y-24">
                {/* Summary */}
                <section data-cv-section="summary" className="text-center">
                    <p className="text-lg md:text-xl font-medium leading-relaxed italic text-gray-500 max-w-3xl mx-auto">
                        "{personalInfo.bio}"
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
                    {/* Left Column */}
                    <div className="md:col-span-8 space-y-20">
                        {/* Experience */}
                        <section data-cv-section="experience">
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-900 mb-12 flex items-center gap-6">
                                Experience <div className="h-px flex-1 bg-gray-100"></div>
                            </h2>
                            <div className="space-y-16">
                                {experience.map((exp, index) => (
                                    <div key={index} data-cv-section={`exp-${index}`} className="space-y-6">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">{exp.company}</h3>
                                                <p className="text-sm font-medium text-gray-500 italic mt-1">{exp.position}</p>
                                            </div>
                                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest border-b border-gray-100 pb-1">{exp.duration}</span>
                                        </div>
                                        <ul className="space-y-4">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="text-sm text-gray-500 leading-relaxed pl-6 border-l border-gray-100 italic">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-4 space-y-20">
                        {/* Expertise */}
                        <section data-cv-section="skills">
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-900 mb-12 flex items-center gap-6">
                                Expertise <div className="h-px flex-1 bg-gray-100"></div>
                            </h2>
                            <div className="space-y-10">
                                {skillCategories.map((cat, i) => (
                                    <div key={i} className="space-y-3">
                                        <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-3 py-1 bg-gray-50 border-l border-gray-900 inline-block">
                                            {cat.category}
                                        </h3>
                                        <p className="text-[11px] font-medium leading-relaxed text-gray-500 pl-3">
                                            {cat.skills.join(', ')}.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Distinctions */}
                        <section data-cv-section="awards">
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-900 mb-12 flex items-center gap-6">
                                Honors <div className="h-px flex-1 bg-gray-100"></div>
                            </h2>
                            <div className="space-y-8">
                                {achievements.slice(0, 3).map((ach, index) => (
                                    <div key={index} className="space-y-2">
                                        <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{ach.title}</h4>
                                        <div className="flex items-center gap-3 text-[10px] font-medium text-gray-400 italic">
                                            <Award size={12} /> {ach.issuer}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section data-cv-section="education">
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-900 mb-12 flex items-center gap-6">
                                Scholars <div className="h-px flex-1 bg-gray-100"></div>
                            </h2>
                            <div className="space-y-4">
                                <h3 className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">BSc. Computer Engineering</h3>
                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">University of Ruhuna, SL</p>
                                <p className="text-[10px] font-black text-gray-400 mt-2">GPA 3.3 • 2020 - 2024</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <footer className="mt-40 text-center">
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[1em]">Refined Excellence in Engineering</p>
            </footer>
        </div>
    );
});

export default ElegantTemplate;
