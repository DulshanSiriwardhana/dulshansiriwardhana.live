import React from "react";
import {
    GraduationCap,
    Code2,
    Mail,
    MapPin,
    Zap,
    Rocket,
    Activity,
    Target
} from "lucide-react";
import {
    personalInfo,
    experience,
    skillCategories,
    stats,
    certificates
} from "../../constants/landingPageData";

interface StartupTemplateProps {
    t: any;
    c: string;
    colorMap: Record<string, string>;
}

const StartupTemplate = React.forwardRef<HTMLDivElement, StartupTemplateProps>(({ c }, ref) => {
    return (
        <div
            ref={ref}
            id="cv-preview"
            className="bg-[#f8fafc] text-slate-900 p-8 md:p-12 shadow-2xl min-w-[320px] font-sans antialiased overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/5 blur-3xl rounded-full -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 blur-3xl rounded-full -ml-40 -mb-40"></div>

            {/* Float Header Card */}
            <header className="relative z-10 bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10 mb-12" data-cv-section="header">
                <div className="text-center md:text-left space-y-4">
                    <div className={`px-4 py-1 bg-${c}-500/10 text-${c}-600 rounded-full text-xs font-black uppercase tracking-widest inline-block`}>
                        {personalInfo.title}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                        {personalInfo.firstName} <span className={`text-${c}-500`}>{personalInfo.lastName}</span>
                    </h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold text-slate-400">
                        <span className="flex items-center gap-2"><MapPin size={16} /> {personalInfo.location}</span>
                        <span className="flex items-center gap-2"><Mail size={16} /> {personalInfo.email}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    {stats.slice(0, 2).map((s, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                            <p className="text-2xl font-black text-slate-900">{s.value}{s.suffix}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                        </div>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    {/* About Card */}
                    <section data-cv-section="summary" className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                            <Rocket size={18} className={`text-${c}-500`} /> Objective
                        </h2>
                        <p className="text-lg font-medium text-slate-600 leading-relaxed italic">
                            {personalInfo.bio}
                        </p>
                    </section>

                    {/* Timeline Card */}
                    <section data-cv-section="experience" className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-10 flex items-center gap-3">
                            <Activity size={18} className="text-blue-500" /> Professional Cycle
                        </h2>
                        <div className="space-y-12">
                            {experience.map((exp, index) => (
                                <div key={index} data-cv-section={`exp-${index}`} className="group">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4">
                                        <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{exp.company}</h3>
                                        <span className={`text-[10px] bg-slate-50 text-slate-400 font-black px-3 py-1 rounded-full border border-slate-100`}>{exp.duration}</span>
                                    </div>
                                    <p className={`text-xs font-black text-${c}-500 uppercase tracking-widest mb-6 italic`}>{exp.position}</p>
                                    <ul className="space-y-4">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="text-sm text-slate-500 font-medium leading-relaxed pl-6 relative">
                                                <div className={`absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-${c}-500/20 group-hover:bg-${c}-500 transition-colors`}></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Skills Card */}
                    <section data-cv-section="skills" className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                            <Target size={18} className="text-purple-500" /> Stack
                        </h2>
                        <div className="space-y-6">
                            {skillCategories.map((cat, i) => (
                                <div key={i} className="space-y-3">
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full bg-${c}-500`}></div>
                                        {cat.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.skills.map((s, j) => (
                                            <span key={j} className="text-[10px] font-bold bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education Card */}
                    <section data-cv-section="education" className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                            <GraduationCap size={18} className="text-yellow-500" /> Education
                        </h2>
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-slate-900 uppercase">BSc. Comp Engineering</h3>
                            <p className="text-[11px] font-bold text-slate-400 leading-tight">University of Ruhuna, Sri Lanka</p>
                            <div className={`mt-4 px-4 py-2 bg-${c}-500/5 border border-${c}-500/10 rounded-2xl text-center`}>
                                <p className={`text-xs font-black text-${c}-600 uppercase`}>GPA 3.3</p>
                            </div>
                        </div>
                    </section>

                    {/* Certs Card */}
                    <section data-cv-section="certificates" className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                            <Zap size={18} className="text-cyan-500" /> Proofs
                        </h2>
                        <div className="space-y-4">
                            {certificates.slice(0, 3).map((cert, index) => (
                                <div key={index} className="flex gap-4 items-start group">
                                    <div className="p-2 bg-slate-50 text-slate-300 rounded-lg group-hover:text-blue-500 transition-colors">
                                        <Code2 size={14} />
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-black text-slate-800 uppercase leading-snug">{cert.title}</h4>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{cert.issuer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <footer className="mt-12 text-center">
                <div className={`h-1.5 w-32 bg-${c}-500/10 rounded-full mx-auto mb-6`}></div>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">Future-Proof Engineering Manifest</p>
            </footer>
        </div>
    );
});

export default StartupTemplate;
