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
import profileImage from "../../assets/images/dp.png";
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

interface ModernTemplateProps {
    t: any;
    c: string;
    colorMap: Record<string, string>;
}

const ModernTemplate = React.forwardRef<HTMLDivElement, ModernTemplateProps>(({ t, c, colorMap }, ref) => {
    const accentText = t.isDark ? `text-${c}-400` : `text-${c}-600`;
    const accentMutedText = t.isDark ? `text-${c}-400/80` : `text-${c}-600/80`;
    const accentBorder = t.isDark ? `border-${c}-500/30` : `border-${c}-500/50`;
    const accentBg = t.isDark ? `bg-${c}-500/20` : `bg-${c}-500/10`;
    const accentGlow = t.isDark ? `shadow-${c}-500/20` : `shadow-${c}-500/10`;

    return (
        <div
            ref={ref}
            id="cv-preview"
            className={`${t.backgroundColor} border ${t.borderColor} rounded-3xl overflow-hidden hover:border-${c}-500/50 transition-all duration-700 shadow-2xl ${accentGlow} min-w-[320px]`}
        >
            {/* CV Header */}
            <div data-cv-section="header" className={`${t.cardColor} border-b ${t.borderColor} p-8 md:p-12`}>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
                    <div className="relative group">
                        <div className={`absolute inset-0 bg-${c}-500/20 rounded-3xl blur-2xl group-hover:bg-${c}-500/40 transition-all duration-500`}></div>
                        <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-[#111] border-2 border-${c}-500/40 p-1 flex items-center justify-center overflow-hidden transform group-hover:scale-105 transition-all duration-500`}>
                            <img
                                src={profileImage}
                                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>
                    <div className="text-center lg:text-left space-y-4">
                        <div>
                            <h2 className={`text-4xl md:text-5xl font-black ${t.textColor} tracking-tighter uppercase italic`}>
                                {personalInfo.firstName} {personalInfo.lastName}
                            </h2>
                            <p className={`${accentText} font-bold text-xl md:text-2xl mt-2 flex items-center justify-center lg:justify-start gap-3`}>
                                <Terminal size={24} />
                                {personalInfo.title}
                            </p>
                        </div>
                        <div className={`flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3 text-sm ${t.mutedTextColor} font-medium`}>
                            <span className={`flex items-center gap-2 hover:${t.textColor} transition-colors`}>
                                <MapPin size={16} className="text-red-500" />
                                {personalInfo.location}
                            </span>
                            <a href={`mailto:${personalInfo.email}`} className={`cv-link flex items-center gap-2 hover:${t.textColor} transition-colors`}>
                                <Mail size={16} className="text-blue-500" />
                                {personalInfo.email}
                            </a>
                            <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className={`cv-link flex items-center gap-2 hover:${t.textColor} transition-colors`}>
                                <Phone size={16} className={`${accentText}`} />
                                {personalInfo.phone}
                            </a>
                            <a href={`https://${personalInfo.website}`} target="_blank" className={`cv-link flex items-center gap-2 hover:${t.textColor} transition-colors`}>
                                <Globe size={16} className="text-purple-500" />
                                {personalInfo.website}
                            </a>
                            <div className="flex gap-4 pt-1">
                                <a href="https://github.com/DulshanSiriwardhana" target="_blank" className={`cv-link hover:${t.textColor} transition-colors`}>
                                    <Terminal size={18} />
                                    <span className="sr-only">GitHub: github.com/DulshanSiriwardhana</span>
                                </a>
                                <a href="https://linkedin.com/in/dulshans" target="_blank" className={`cv-link hover:${t.textColor} transition-colors`}>
                                    <Briefcase size={18} />
                                    <span className="sr-only">LinkedIn: linkedin.com/in/dulshans</span>
                                </a>
                                <a href="https://facebook.com/profile.php?id=61568544393764" target="_blank" className={`cv-link hover:${t.textColor} transition-colors`}>
                                    <Share2 size={18} />
                                    <span className="sr-only">Facebook: Rasindu Dulshan Siriwardhana</span>
                                </a>
                                <a href="https://medium.com/@dulshansiriwardhanaofficial" target="_blank" className={`cv-link hover:${t.textColor} transition-colors`}>
                                    <PenTool size={18} />
                                    <span className="sr-only">Medium: @dulshansiriwardhanaofficial</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-12 space-y-12">
                {/* Professional Summary */}
                <div data-cv-section="summary">
                    <h3 className={`text-xl font-bold ${accentText} mb-6 flex items-center gap-3`}>
                        <Search size={22} className="text-blue-500" />
                        PROFESSIONAL SUMMARY
                        <div className={`h-px flex-1 bg-gradient-to-r from-${c}-500/30 to-transparent ml-4`}></div>
                    </h3>
                    <p className={`${t.mutedTextColor} leading-relaxed text-sm md:text-lg font-medium font-spectral italic border-l-4 border-${c}-500/20 pl-6 py-2`}>
                        {personalInfo.bio} Dedicated Full-Stack Engineer with a deep focus on performance optimization, distributed systems, and modern architectural patterns. Expert in delivering high-fidelity user experiences and robust backend infrastructures.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Experience Column */}
                    <div className="space-y-10">
                        <div data-cv-section="experience">
                            <h3 className={`text-xl font-bold ${accentText} mb-8 flex items-center gap-3`}>
                                <Briefcase size={22} className="text-orange-500" />
                                WORK EXPERIENCE
                                <div className={`h-px flex-1 bg-gradient-to-r from-${c}-500/30 to-transparent ml-4`}></div>
                            </h3>
                            <div className="space-y-10">
                                {experience.map((exp, index) => (
                                    <div key={index} data-cv-section={`exp-${index}`} className="relative group pl-8">
                                        <div className={`absolute left-0 top-0 bottom-0 w-px ${accentBorder} group-hover:bg-${c}-500/50 transition-all`}></div>
                                        <div className={`absolute left-[-4px] top-2 w-2 h-2 ${t.isDark ? `bg-${c}-400 shadow-${c}-500/50` : `bg-${c}-600 shadow-${c}-500/20`} rounded-full shadow-lg`}></div>
                                        <h4 className={`font-bold text-base md:text-lg uppercase group-hover:text-${c}-400 transition-colors ${t.textColor}`}>
                                            {exp.position}
                                        </h4>
                                        <p className={`${accentMutedText} text-sm font-bold tracking-widest uppercase mt-1`}>
                                            {exp.company}, Colombo, Sri Lanka
                                        </p>
                                        <div className={`flex items-center gap-2 ${t.mutedTextColor} text-xs mt-1 font-mono uppercase tracking-tighter`}>
                                            <Calendar size={12} />
                                            {exp.duration}
                                        </div>
                                        <ul className="mt-4 space-y-2">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className={`${t.mutedTextColor} text-xs md:text-sm flex items-start gap-3 group/li`}>
                                                    <ChevronRight size={14} className={`${accentText} flex-shrink-0 mt-1 group-hover/li:translate-x-1 transition-transform`} />
                                                    <span className={`group-hover:${t.textColor} transition-colors`}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div data-cv-section="achievements">
                            <h3 className={`text-xl font-bold ${accentText} mb-8 flex items-center gap-3`}>
                                <Trophy size={22} className="text-yellow-500" />
                                KEY ACHIEVEMENTS
                                <div className={`h-px flex-1 bg-gradient-to-r from-${c}-500/30 to-transparent ml-4`}></div>
                            </h3>
                            <div className="space-y-4">
                                {achievements.map((ach, index) => (
                                    <div key={index} data-cv-section={`ach-${index}`} className={`p-4 ${t.cardColor} border ${t.borderColor} rounded-2xl hover:bg-${c}-500/5 hover:border-${c}-500/30 transition-all group`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`${t.textColor} font-bold text-sm md:text-base group-hover:text-${c}-400 transition-all uppercase`}>{ach.title}</h4>
                                            <span className={`text-[10px] bg-${c}-500/10 text-${c}-400 px-2 py-0.5 rounded-full font-bold border border-${c}-500/20`}>{ach.date}</span>
                                        </div>
                                        <p className={`${t.mutedTextColor} text-xs font-bold uppercase tracking-tight mb-2 italic`}>{ach.issuer}</p>
                                        <p className={`${t.mutedTextColor} text-xs md:text-sm`}>{ach.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Education & Skills Column */}
                    <div className="space-y-12">
                        <div data-cv-section="education">
                            <h3 className={`text-xl font-bold ${accentText} mb-8 flex items-center gap-3`}>
                                <GraduationCap size={22} className="text-yellow-500" />
                                EDUCATION
                                <div className={`h-px flex-1 bg-gradient-to-r from-${c}-500/30 to-transparent ml-4`}></div>
                            </h3>
                            <div className="space-y-6">
                                <div data-cv-section="edu-1" className={`${t.cardColor} border ${t.borderColor} rounded-2xl p-6 hover:border-${c}-500/40 transition-all group`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className={`${t.textColor} font-bold text-lg uppercase group-hover:text-${c}-400`}>BSc. (Hons) in Computer Engineering</h4>
                                        <span className={`text-xs ${t.mutedTextColor} font-mono`}>University of Ruhuna, Sri Lanka, {experience[1].duration}</span>
                                    </div>
                                    <p className={`${t.mutedTextColor} text-sm font-bold italic`}>Specializing in Software Architecture and AI</p>
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className={`flex items-center gap-2 ${accentText} text-xs font-black px-3 py-1 ${accentBg} border ${accentBorder} rounded-full uppercase tracking-widest`}>
                                            <Award size={14} />
                                            GPA: 3.3
                                        </div>
                                    </div>
                                </div>
                                <div data-cv-section="edu-2" className={`${t.cardColor} border ${t.borderColor} rounded-2xl p-6 hover:border-${c}-500/40 transition-all group`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className={`${t.textColor} font-bold text-lg uppercase group-hover:text-${c}-400`}>Advanced Level</h4>
                                        <span className={`text-xs ${t.mutedTextColor} font-mono`}>JAN 2019</span>
                                    </div>
                                    <p className={`${t.mutedTextColor} text-sm font-bold italic`}>Ch/Senanayaka Central College, Physical Science</p>
                                    <div className="mt-4 flex items-center gap-4">
                                        <span className={`${accentText} text-xs font-black px-3 py-1 ${accentBg} border ${accentBorder} rounded-full tracking-[0.2em]`}>ABB</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div data-cv-section="skills">
                            <h3 className={`text-xl font-bold text-${c}-400 mb-8 flex items-center gap-3`}>
                                <Code2 size={24} className="text-purple-400" />
                                TECHNICAL SKILLS
                                <div className={`h-px flex-1 bg-gradient-to-r from-${c}-500/30 to-transparent ml-4`}></div>
                            </h3>

                            <div className="sr-only">
                                <h4>TECHNICAL SKILLS AND CORE COMPETENCIES</h4>
                                {skillCategories.map(cat => `${cat.category}: ${cat.skills.join(', ')}`).join('. ')}
                                Full Stack Proficiency: {skillLevels.map(skill => `${skill.skill}`).join(', ')}
                            </div>

                            <div className="space-y-5">
                                {skillLevels.map((skill, index) => (
                                    <div key={index} className="space-y-1.5 group">
                                        <div className="flex justify-between text-xs uppercase tracking-widest font-black">
                                            <span className={`${t.mutedTextColor} group-hover:${t.textColor} transition-colors`}>{skill.skill}</span>
                                            <span className={`${accentText} italic`}>{skill.level}%</span>
                                        </div>
                                        <div className={`w-full h-1.5 ${t.cardColor} rounded-full overflow-hidden border ${t.borderColor}`}>
                                            <div
                                                className={`h-full bg-gradient-to-r from-${c}-600 via-${c}-400 to-${c}-300 rounded-full transition-all duration-1000`}
                                                style={{ width: `${skill.level}%`, background: t.isDark ? undefined : `linear-gradient(to right, ${colorMap[c] || '#555'}, #ccc)` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 grid grid-cols-1 gap-4">
                                {skillCategories.map((cat, i) => (
                                    <div key={i} className={`p-4 ${t.cardColor} border ${t.borderColor} rounded-2xl group transition-all`}>
                                        <p className={`text-[10px] ${t.mutedTextColor} font-black mb-3 uppercase tracking-[0.3em] flex items-center gap-2`}>
                                            <Layers size={12} className={`text-${c}-500/50`} />
                                            {cat.category}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.skills.map((s, j) => (
                                                <span key={j} className={`text-[10px] md:text-xs ${accentText} font-bold px-2.5 py-1 ${accentBg} border ${accentBorder} rounded-lg group-hover:border-${c}-500 transition-all uppercase tracking-tight`}>
                                                    {s}
                                                </span>
                                            ))}

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificates */}
                <div data-cv-section="certificates">
                    <h3 className={`text-xl font-bold ${accentText} mb-8 flex items-center gap-3`}>
                        <ShieldCheck size={24} className={`${accentText}`} />
                        CERTIFICATES
                        <div className={`h-px flex-1 bg-gradient-to-r from-${c}-500/30 to-transparent ml-4`}></div>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {certificates.map((cert, index) => (
                            <a key={index} href={cert.link} target="_blank" className={`cv-link p-5 ${t.cardColor} border ${t.borderColor} rounded-2xl flex flex-col justify-between hover:bg-${c}-500/5 hover:border-${c}-500/30 transition-all group`}>
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <CheckCircle2 size={16} className={`${accentText} opacity-50`} />
                                        <span className={`text-[10px] ${t.mutedTextColor} font-mono italic`}>{cert.date}</span>
                                    </div>
                                    <h4 className={`${t.textColor} font-bold text-sm uppercase group-hover:text-${c}-400 transition-colors leading-tight mb-2`}>
                                        {cert.title}
                                    </h4>
                                    <p className={`${t.mutedTextColor} text-[10px] font-black uppercase tracking-widest`}>{cert.issuer}</p>
                                </div>
                                <ExternalLink size={12} className={`mt-4 ${accentText} opacity-40 group-hover:opacity-100 transition-all self-end`} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Full Projects Section */}
                <div data-cv-section="projects">
                    <h3 className={`text-xl font-bold ${accentText} mb-8 flex items-center gap-3`}>
                        <Code2 size={24} className="text-cyan-400" />
                        KEY PROJECTS
                        <div className={`h-px flex-1 bg-gradient-to-r from-${c}-500/30 to-transparent ml-4`}></div>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((proj, index) => (
                            <div key={index} data-cv-section={`proj-${index}`} className={`p-6 ${t.cardColor} border ${t.borderColor} rounded-2xl hover:border-${c}-500/30 transition-all group h-full flex flex-col`}>
                                <h4 className={`${t.textColor} font-black text-base uppercase mb-3 flex items-center justify-between`}>
                                    {proj.title}
                                    {proj.featured && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                                </h4>
                                <p className={`${t.mutedTextColor} text-xs md:text-sm leading-relaxed flex-grow italic mb-4`}>
                                    {proj.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {proj.tech.slice(0, 4).map((tech, i) => (
                                        <span key={i} className={`text-[8px] md:text-[10px] ${accentText} opacity-80 border ${accentBorder} px-2 py-0.5 rounded-md font-black uppercase`}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className={`flex items-center gap-4 text-[10px] font-bold ${t.mutedTextColor} pt-4 border-t ${t.borderColor}`}>
                                    <a href={proj.github} target="_blank" className={`cv-link hover:${accentText} transition-all uppercase flex items-center gap-1.5`}>
                                        <Terminal size={12} /> Source
                                    </a>
                                    <a href={proj.link} target="_blank" className={`cv-link hover:${accentText} transition-all uppercase flex items-center gap-1.5`}>
                                        <Globe size={12} /> Live
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats & Publications */}
                <div data-cv-section="stats" className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h3 className={`text-xl font-bold ${accentText} mb-8 flex items-center gap-3`}>
                            <Terminal size={22} className={`${t.textColor}`} />
                            ONLINE PROFILES & STATS
                            <div className={`h-px flex-1 bg-gradient-to-r from-${c}-500/30 to-transparent ml-4`}></div>
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((s, index) => (
                                <div key={index} className={`p-6 ${t.cardColor} border ${t.borderColor} rounded-3xl text-center group hover:border-${c}-500/30 transition-all`}>
                                    <p className={`text-3xl font-black ${t.textColor} group-hover:${accentText} transition-colors tracking-tighter`}>
                                        {s.value}{s.suffix}
                                    </p>
                                    <p className={`${t.mutedTextColor} text-[10px] font-bold uppercase tracking-[0.2em] mt-2`}>{s.label}</p>
                                </div>
                            ))}
                        </div>
                        <div className={`mt-6 p-6 ${t.cardColor} border ${t.borderColor} rounded-3xl space-y-4`}>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs font-bold ${t.mutedTextColor} uppercase tracking-widest`}>Top 10 Contributor</span>
                                <span className={`text-xs font-black text-${c}-400`}>SRI LANKA</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs font-bold ${t.mutedTextColor} uppercase tracking-widest`}>Public Repos</span>
                                <span className={`text-xs font-black text-${c}-400`}>100+</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs font-bold ${t.mutedTextColor} uppercase tracking-widest`}>Commits</span>
                                <span className={`text-xs font-black ${accentText}`}>3800+</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className={`text-xl font-bold ${accentText} mb-8 flex items-center gap-3`}>
                            <BookOpen size={22} className="text-blue-400" />
                            PUBLICATIONS & PRESENTATIONS
                            <div className={`h-px flex-1 bg-gradient-to-r from-${c}-500/30 to-transparent ml-4`}></div>
                        </h3>
                        <div className="space-y-6">
                            {blogArticles.map((art, index) => (
                                <a key={index} href={art.url} target="_blank" className={`cv-link block p-6 ${t.cardColor} border ${t.borderColor} rounded-3xl hover:border-${c}-500/40 transition-all group`}>
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className={`${t.textColor} font-bold text-base md:text-lg uppercase leading-tight group-hover:text-${c}-400`}>{art.title}</h4>
                                        <PenTool size={16} className="text-blue-500/50" />
                                    </div>
                                    <p className={`${t.mutedTextColor} text-xs md:text-sm italic mb-4`}>{art.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {art.tags.map((tag, i) => (
                                            <span key={i} className="text-[10px] text-blue-400/80 bg-blue-500/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{tag}</span>
                                        ))}
                                    </div>
                                </a>
                            ))}
                            <div className={`p-6 ${t.cardColor} border ${t.borderColor} rounded-3xl group`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className={`${t.textColor} font-bold text-base uppercase group-hover:${accentText}`}>Presenter – Rextro 2026</h4>
                                    <User size={16} className="text-yellow-500/50" />
                                </div>
                                <p className={`${t.mutedTextColor} text-xs md:text-sm leading-relaxed`}>
                                    Demonstrated a technical project to a live audience, explaining system architecture and answering technical questions on practical engineering applications.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* References */}
                <div data-cv-section="references">
                    <h3 className={`text-xl font-bold ${accentText} mb-8 flex items-center gap-3 uppercase tracking-tighter`}>
                        <CheckCircle2 size={24} className={`${accentText}`} />
                        REFERENCES
                        <div className={`h-px flex-1 bg-gradient-to-r from-${c}-500/30 to-transparent ml-4`}></div>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {references.map((ref, index) => (
                            <div key={index} className={`p-8 ${t.cardColor} border ${t.borderColor} rounded-3xl group hover:border-${c}-500/30 transition-all`}>
                                <h4 className={`${t.textColor} font-black text-xl uppercase mb-2 group-hover:text-${c}-400`}>{ref.name}</h4>
                                <p className={`${accentMutedText} text-xs font-bold uppercase tracking-widest mb-1`}>{ref.role}</p>
                                <p className={`${t.mutedTextColor} text-xs font-medium italic mb-6`}>{ref.organization}</p>
                                <div className="space-y-2">
                                    <a href={`mailto:${ref.email}`} className={`cv-link flex items-center gap-3 text-sm ${t.mutedTextColor} font-mono hover:${accentText} transition-colors`}>
                                        <Mail size={14} className="text-blue-500" /> {ref.email}
                                    </a>
                                    {ref.phone && (
                                        <a href={`tel:${ref.phone.replace(/\s/g, '')}`} className={`cv-link flex items-center gap-3 text-sm ${t.mutedTextColor} font-mono hover:${accentText} transition-colors`}>
                                            <Phone size={14} className="text-emerald-500" /> {ref.phone}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ModernTemplate;
