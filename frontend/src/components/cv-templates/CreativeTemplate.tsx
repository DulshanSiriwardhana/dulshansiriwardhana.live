import React from "react";
import {
    Mail,
    MapPin,
    Zap,
    Globe,
    Send,
    Smartphone
} from "lucide-react";
import {
    personalInfo,
    experience,
    skillLevels,
    stats
} from "../../constants/landingPageData";

interface CreativeTemplateProps {
    t: any;
    c: string;
    colorMap: Record<string, string>;
}

const CreativeTemplate = React.forwardRef<HTMLDivElement, CreativeTemplateProps>(({ t }, ref) => {
    return (
        <div
            ref={ref}
            id="cv-preview"
            className={`${t.backgroundColor} border ${t.borderColor} rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.3)] min-w-[320px] font-sans relative`}
        >
            <div className="flex flex-col lg:grid lg:grid-cols-12">
                {/* Visual Sidebar */}
                <aside className="lg:col-span-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 lg:p-14 space-y-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>

                    <div className="relative z-10 space-y-8" data-cv-section="header">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none uppercase italic">
                                {personalInfo.firstName}<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">{personalInfo.lastName}</span>
                            </h1>
                            <p className="text-sm font-bold tracking-[0.3em] text-gray-400 uppercase">{personalInfo.title}</p>
                        </div>

                        <div className="space-y-6 pt-6">
                            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 border-b border-gray-800 pb-2 flex items-center gap-3">
                                <Send size={14} className="text-green-500" /> Connection
                            </h2>
                            <div className="space-y-4 text-sm font-medium">
                                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                                    <div className="p-2 bg-gray-800 rounded-lg"><Mail size={16} /></div>
                                    <span className="truncate">{personalInfo.email}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                                    <div className="p-2 bg-gray-800 rounded-lg"><Smartphone size={16} /></div>
                                    <span>{personalInfo.phone}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                                    <div className="p-2 bg-gray-800 rounded-lg"><Globe size={16} /></div>
                                    <span>{personalInfo.website}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                                    <div className="p-2 bg-gray-800 rounded-lg"><MapPin size={16} /></div>
                                    <span>{personalInfo.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-6" data-cv-section="stats">
                            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 border-b border-gray-800 pb-2 flex items-center gap-3">
                                <Zap size={14} className="text-yellow-500" /> Ecosystem
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {stats.slice(0, 4).map((s, i) => (
                                    <div key={i} className="p-4 bg-gray-800/50 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                                        <p className="text-2xl font-black text-white group-hover:text-green-400 transition-colors">{s.value}{s.suffix}</p>
                                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter mt-1">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-8 p-10 lg:p-14 space-y-16 bg-white dark:bg-[#080808]">
                    {/* Summary */}
                    <section data-cv-section="summary" className="relative">
                        <div className="absolute -left-10 top-0 text-7xl font-black text-gray-100 dark:text-gray-900 select-none">01</div>
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-4">
                                The Narrative <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
                            </h2>
                            <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 leading-relaxed indent-10 italic">
                                {personalInfo.bio} A technical visionary specializing in the convergence of performance-first engineering and immersive interface design.
                            </p>
                        </div>
                    </section>

                    {/* Industrial Skillset */}
                    <section data-cv-section="skills" className="relative">
                        <div className="absolute -left-10 top-0 text-7xl font-black text-gray-100 dark:text-gray-900 select-none">02</div>
                        <div className="relative z-10 space-y-10">
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-4">
                                Mastery <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {skillLevels.slice(0, 4).map((skill, index) => (
                                    <div key={index} className="space-y-4 group">
                                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-500">
                                            <span>{skill.skill}</span>
                                            <span className="text-green-500">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden border border-gray-200/50 dark:border-white/5">
                                            <div
                                                className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full group-hover:scale-x-105 transition-transform origin-left duration-1000"
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Timeline */}
                    <section data-cv-section="experience" className="relative">
                        <div className="absolute -left-10 top-0 text-7xl font-black text-gray-100 dark:text-gray-900 select-none">03</div>
                        <div className="relative z-10 space-y-10">
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-4">
                                Experience <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
                            </h2>
                            <div className="space-y-12">
                                {experience.map((exp, index) => (
                                    <div key={index} className="relative pl-10 border-l border-gray-200 dark:border-gray-800 group">
                                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-white dark:bg-black border-2 border-green-500 rounded-full group-hover:scale-150 transition-transform"></div>
                                        <div className="flex flex-col md:flex-row md:justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 dark:text-white group-hover:text-green-500 transition-colors">{exp.company}</h3>
                                                <p className="text-sm font-bold text-gray-500 uppercase italic">{exp.position}</p>
                                            </div>
                                            <span className="text-xs font-black text-gray-400 uppercase mt-1 md:mt-0">{exp.duration}</span>
                                        </div>
                                        <ul className="space-y-3">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="text-sm text-gray-600 dark:text-gray-500 flex items-start gap-3">
                                                    <div className="mt-1.5 w-1.5 h-1.5 flex-shrink-0 bg-green-500/30 rounded-full"></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            {/* Artistic Decoration */}
            <div className="absolute top-10 right-10 flex gap-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-1.5 h-10 bg-gradient-to-b from-green-500 to-transparent rounded-full opacity-20 transform -skew-x-12"></div>
                ))}
            </div>
        </div>
    );
});

export default CreativeTemplate;
