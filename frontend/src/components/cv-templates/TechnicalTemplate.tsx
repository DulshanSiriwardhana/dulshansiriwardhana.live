import React from "react";
import {
    Terminal,
    Code2,
    Cpu,
    Globe,
    Zap,
    Layers
} from "lucide-react";
import {
    personalInfo,
    experience,
    skillCategories,
    projects,
    stats
} from "../../constants/landingPageData";

interface TechnicalTemplateProps {
    t: any;
    c: string;
    colorMap: Record<string, string>;
}

const TechnicalTemplate = React.forwardRef<HTMLDivElement, TechnicalTemplateProps>((_props, ref) => {
    return (
        <div
            ref={ref}
            id="cv-preview"
            className="bg-[#0c0c0c] text-[#a0a0a0] p-8 md:p-16 shadow-2xl min-w-[320px] font-mono selection:bg-[#22c55e] selection:text-black"
        >
            {/* CLI Header */}
            <div className="mb-12 border-b border-[#222] pb-10" data-cv-section="header">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-xs font-bold text-[#444] tracking-widest uppercase">system_identifier: v1.0.4</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                    <span className="text-green-500">$</span> root@{personalInfo.firstName.toLowerCase()}
                </h1>
                <p className="text-xl text-green-500/80 mb-8 animate-pulse italic">_ {personalInfo.title}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
                    <div className="bg-[#111] p-3 border border-[#222] rounded flex items-center gap-3">
                        <Terminal size={14} className="text-green-500" />
                        <span className="text-[#666]">IP:</span> 127.0.0.1
                    </div>
                    <div className="bg-[#111] p-3 border border-[#222] rounded flex items-center gap-3">
                        <Globe size={14} className="text-blue-500" />
                        <span className="text-[#666]">DOMAIN:</span> {personalInfo.website}
                    </div>
                    <div className="bg-[#111] p-3 border border-[#222] rounded flex items-center gap-3">
                        <Zap size={14} className="text-yellow-500" />
                        <span className="text-[#666]">LOC:</span> {personalInfo.location.toUpperCase()}
                    </div>
                    <div className="bg-[#111] p-3 border border-[#222] rounded flex items-center gap-3">
                        <Code2 size={14} className="text-purple-500" />
                        <span className="text-[#666]">STACK:</span> FULL_STACK
                    </div>
                </div>
            </div>

            <div className="space-y-12">
                {/* Summary */}
                <section data-cv-section="summary">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-black text-[#444] uppercase tracking-[0.3em]">01. system_manifesto</span>
                        <div className="h-px flex-1 bg-[#222]"></div>
                    </div>
                    <p className="text-sm leading-relaxed text-[#888] max-w-4xl italic">
                        {personalInfo.bio} Optimized for high-throughput development and low-latency system architectures.
                        Primary objective: Build robust, scalable ecosystems using cutting-edge deterministic logic.
                    </p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Column */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Experience */}
                        <section data-cv-section="experience">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-xs font-black text-green-500/50 uppercase tracking-[0.3em]">02. deployment_history</span>
                                <div className="h-px flex-1 bg-[#222]"></div>
                            </div>
                            <div className="space-y-10">
                                {experience.map((exp, index) => (
                                    <div key={index} data-cv-section={`exp-${index}`} className="relative pl-6 border-l border-[#222] hover:border-green-500/30 transition-colors">
                                        <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#222] rotate-45 group-hover:bg-green-500"></div>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-lg font-bold text-white uppercase tracking-tight">{exp.company}</h3>
                                            <span className="text-[10px] font-black text-[#555] tracking-[0.2em]">{exp.duration}</span>
                                        </div>
                                        <p className="text-xs font-bold text-green-500/70 mb-4 uppercase tracking-widest">{exp.position}</p>
                                        <ul className="space-y-2">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="text-xs text-[#777] flex items-start gap-3">
                                                    <span className="text-green-500/30">{">> "}</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Projects */}
                        <section data-cv-section="projects">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-xs font-black text-purple-500/50 uppercase tracking-[0.3em]">03. compiled_projects</span>
                                <div className="h-px flex-1 bg-[#222]"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projects.slice(0, 4).map((proj, index) => (
                                    <div key={index} data-cv-section={`proj-${index}`} className="bg-[#111] p-5 border border-[#222] rounded hover:border-purple-500/30 transition-all group">
                                        <h4 className="text-xs font-black text-white uppercase mb-2 flex justify-between items-center">
                                            {proj.title}
                                        </h4>
                                        <p className="text-[10px] text-[#666] leading-relaxed mb-4">{proj.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {proj.tech.slice(0, 3).map((tool, i) => (
                                                <span key={i} className="text-[8px] font-black text-purple-500/60 uppercase border border-purple-500/10 px-1.5 py-0.5 rounded leading-none">{tool}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Hardware/Skills */}
                        <section data-cv-section="skills">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-xs font-black text-blue-500/50 uppercase tracking-[0.3em]">04. tech_stack</span>
                                <div className="h-px flex-1 bg-[#222]"></div>
                            </div>
                            <div className="space-y-6">
                                {skillCategories.map((cat, i) => (
                                    <div key={i} className="space-y-3">
                                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                            <Cpu size={12} className="text-blue-500/50" />
                                            {cat.category}
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {cat.skills.map((s, j) => (
                                                <span key={j} className="text-[9px] font-bold bg-[#111] text-[#666] border border-[#222] px-2 py-1 rounded hover:text-blue-400 hover:border-blue-500/30 transition-all">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* System Stats */}
                        <section data-cv-section="stats">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-xs font-black text-yellow-500/50 uppercase tracking-[0.3em]">05. perf_metrics</span>
                                <div className="h-px flex-1 bg-[#222]"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((s, i) => (
                                    <div key={i} className="bg-[#111] p-4 border border-[#222] text-center">
                                        <p className="text-lg font-black text-white">{s.value}{s.suffix}</p>
                                        <p className="text-[8px] font-bold text-[#555] uppercase tracking-widest mt-1">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Database/Education */}
                        <section data-cv-section="education">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-xs font-black text-red-500/50 uppercase tracking-[0.3em]">06. training_vols</span>
                                <div className="h-px flex-1 bg-[#222]"></div>
                            </div>
                            <div className="bg-[#111] p-4 border-l-2 border-red-500/30">
                                <h4 className="text-[10px] font-black text-white uppercase mb-1">BSc. Comp Engineering</h4>
                                <p className="text-[9px] text-[#555] uppercase">University of Ruhuna</p>
                                <div className="mt-4 text-[9px] font-bold text-red-500/60 uppercase flex items-center gap-2">
                                    <Layers size={10} /> GPA: 3.3 [STABLE]
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* CLI Footer */}
            <div className="mt-20 pt-8 border-t border-[#222]">
                <p className="text-[10px] font-bold text-[#333] tracking-[1em] uppercase">SYSTEM_ID: {personalInfo.firstName.toUpperCase()}_{personalInfo.lastName.toUpperCase()}_0x7F</p>
            </div>
        </div>
    );
});

export default TechnicalTemplate;
