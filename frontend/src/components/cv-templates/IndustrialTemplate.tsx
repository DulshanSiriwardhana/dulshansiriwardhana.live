import React from "react";
import {
    Terminal
} from "lucide-react";
import {
    personalInfo,
    experience,
    skillCategories,
    stats
} from "../../constants/landingPageData";

interface IndustrialTemplateProps {
    t: any;
    c: string;
    colorMap: Record<string, string>;
}

const IndustrialTemplate = React.forwardRef<HTMLDivElement, IndustrialTemplateProps>(({ t, c, colorMap }, ref) => {
    const accentColor = colorMap[c] || "#000";

    return (
        <div
            ref={ref}
            id="cv-preview"
            className={`${t.cardColor === 'bg-[#111]' ? 'bg-[#000]' : 'bg-[#eee]'} ${t.textColor} p-1 md:p-3 shadow-2xl min-w-[320px] font-sans antialiased`}
        >
            <div className={`${t.backgroundColor} border-[10px] ${t.borderColor} p-10 md:p-16`}>
                {/* Header */}
                <header style={{ borderBottomColor: accentColor }} className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 border-b-[6px] pb-16" data-cv-section="header">
                    <div className="md:col-span-8">
                        <div style={{ backgroundColor: accentColor }} className="inline-block text-white px-6 py-2 text-sm font-black uppercase tracking-[0.3em] mb-6">PERSONAL_DOSSIER</div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase mb-8">
                            {personalInfo.firstName}<br />{personalInfo.lastName}
                        </h1>
                        <p className="text-2xl font-black uppercase tracking-tight text-gray-400">{personalInfo.title}</p>
                    </div>
                    <div className="md:col-span-4 flex flex-col justify-end space-y-4 text-xs font-black uppercase tracking-widest text-right">
                        <div className="space-y-1">
                            <p className="text-gray-400">LOC:</p>
                            <p>{personalInfo.location}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-400">EML:</p>
                            <p>{personalInfo.email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-400">WEB:</p>
                            <p>{personalInfo.website}</p>
                        </div>
                        <div className="pt-6 border-t border-black/10">
                            <p className="text-gray-300">REF_ID: 1999_SL_0x</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* Left Column */}
                    <div className="md:col-span-7 space-y-20">
                        {/* Summary */}
                        <section data-cv-section="summary">
                            <h2 className="text-xl font-black uppercase tracking-tight mb-8 bg-black text-white px-4 py-1 inline-block italic">MANIFESTO</h2>
                            <p className="text-xl md:text-2xl font-bold leading-[1.2] tracking-tight uppercase">
                                {personalInfo.bio} Architecting the future through high-fidelity engineering and architectural precision.
                            </p>
                        </section>

                        {/* Experience */}
                        <section data-cv-section="experience">
                            <h2 style={{ borderLeftColor: accentColor }} className="text-xl font-black uppercase tracking-tight mb-12 border-l-[10px] pl-6">LOGS // EXP</h2>
                            <div className="space-y-16">
                                {experience.map((exp, index) => (
                                    <div key={index} data-cv-section={`exp-${index}`} className="group relative">
                                        <div className="absolute -left-10 top-0 text-5xl font-black text-gray-100 select-none group-hover:text-black transition-colors">0{index + 1}</div>
                                        <div className="relative z-10 space-y-4">
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="text-2xl font-black uppercase tracking-tighter">{exp.company}</h3>
                                                <span className="text-sm font-black bg-black text-white px-3 py-1">{exp.duration}</span>
                                            </div>
                                            <p className="text-sm font-black text-gray-400 uppercase tracking-widest italic">{exp.position}</p>
                                            <ul className="space-y-4 pt-4 border-t-2 border-black/5">
                                                {exp.description.map((item, i) => (
                                                    <li key={i} className="text-sm font-bold leading-relaxed flex items-start gap-4">
                                                        <span className="mt-1.5 w-2 h-2 bg-black flex-shrink-0"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-5 space-y-20">
                        {/* Hardware/Skills */}
                        <section data-cv-section="skills">
                            <h2 className="text-xl font-black uppercase tracking-tight mb-12 flex justify-between items-center">
                                UNT // SKILLS <Terminal size={24} />
                            </h2>
                            <div className="space-y-10">
                                {skillCategories.map((cat, i) => (
                                    <div key={i} className="space-y-4">
                                        <h3 className="text-xs font-black text-white bg-black px-4 py-1 uppercase tracking-[0.2em]">{cat.category}</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {cat.skills.map((s, j) => (
                                                <div key={j} className="border-b-2 border-black pb-2 flex justify-between items-center group">
                                                    <span className="text-xs font-black uppercase tracking-tight group-hover:pl-2 transition-all">{s}</span>
                                                    <div className="w-1.5 h-1.5 bg-black opacity-10 group-hover:opacity-100 transition-opacity"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section data-cv-section="education">
                            <h2 className="text-xl font-black uppercase tracking-tight mb-12 flex justify-between items-center border-b-[6px] border-black pb-4">
                                ACD // TRAINING
                            </h2>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-black uppercase tracking-tight">University of Ruhuna, SL</h3>
                                    <p className="text-sm font-bold text-gray-500 uppercase">BSc. (Hons) Computer Engineering</p>
                                    <div className="inline-block border-[4px] border-black px-4 py-2 mt-4 text-xl font-black uppercase tracking-tighter italic">GPA 3.3 / 4.0</div>
                                </div>
                            </div>
                        </section>

                        {/* Stats */}
                        <section data-cv-section="stats">
                            <h2 className="text-xl font-black uppercase tracking-tight mb-12 bg-black text-white px-4 py-1 text-center">METRICS</h2>
                            <div className="grid grid-cols-2 gap-px bg-black">
                                {stats.map((s, i) => (
                                    <div key={i} className="bg-white p-8 text-center group hover:bg-black transition-colors">
                                        <p className="text-3xl font-black tracking-tighter group-hover:text-white transition-colors">{s.value}{s.suffix}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-32 pt-16 border-t-[10px] border-black flex justify-between items-end">
                    <div>
                        <div className="text-6xl font-black tracking-tighter leading-none mb-2">DS.</div>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em]">INDUSTRIAL_GRADE_CV</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-2 font-mono">HASH: 0x827364519FF</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">© 2026 CYBERHEX SYSTEMS</p>
                    </div>
                </footer>
            </div>
        </div>
    );
});

export default IndustrialTemplate;
