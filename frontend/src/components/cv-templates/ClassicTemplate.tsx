import React from "react";
import {
    Briefcase,
    Mail,
    Terminal,
    Phone
} from "lucide-react";
import {
    personalInfo,
    experience,
    skillCategories,
    certificates,
    achievements
} from "../../constants/landingPageData";

interface ClassicTemplateProps {
    t: any;
    c: string;
    colorMap: Record<string, string>;
}

const ClassicTemplate = React.forwardRef<HTMLDivElement, ClassicTemplateProps>((_props, ref) => {
    const blueAccent = "#00ABF0";

    return (
        <div
            ref={ref}
            id="cv-preview"
            className="bg-white text-gray-800 p-8 md:p-16 shadow-2xl min-w-[320px] font-sans"
            style={{ color: '#333' }}
        >
            {/* Header */}
            <div className="text-center mb-10" data-cv-section="header">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
                <p className="text-sm text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
                    {personalInfo.bio} Professional Full-Stack Engineer with a deep focus on performance optimization, distributed systems, and modern architectural patterns. Expert in delivering high-fidelity user experiences and robust backend infrastructures.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
                    <a href={`mailto:${personalInfo.email}`} className="cv-link flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <Mail size={16} style={{ color: blueAccent }} />
                        {personalInfo.email}
                    </a>
                    <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="cv-link flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <Phone size={16} style={{ color: blueAccent }} />
                        {personalInfo.phone}
                    </a>
                    <a href="https://linkedin.com/in/dulshans" target="_blank" className="cv-link flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <Briefcase size={16} style={{ color: blueAccent }} />
                        LinkedIn
                    </a>
                    <a href="https://github.com/DulshanSiriwardhana" target="_blank" className="cv-link flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <Terminal size={16} style={{ color: blueAccent }} />
                        GitHub
                    </a>
                </div>
            </div>

            {/* Experience */}
            <div className="mb-10" data-cv-section="experience">
                <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: blueAccent }}>Work Experience</h2>
                <div className="h-0.5 w-full bg-gray-200 mb-6"></div>

                <div className="space-y-8">
                    {experience.map((exp, index) => (
                        <div key={index} data-cv-section={`exp-${index}`}>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                <div>
                                    <h3 className="text-md font-bold text-gray-900">{exp.company}</h3>
                                    <p className="text-sm font-medium text-gray-700 italic">{exp.position}</p>
                                </div>
                                <span className="text-xs font-bold text-gray-500 mt-1 md:mt-0">{exp.duration}</span>
                            </div>
                            <ul className="list-disc list-inside space-y-1.5 ml-1">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="text-sm text-gray-600 leading-relaxed pl-1 marker:text-gray-400">
                                        <span className="relative -left-1">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div className="mb-10" data-cv-section="education">
                <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: blueAccent }}>Education</h2>
                <div className="h-0.5 w-full bg-gray-200 mb-6"></div>

                <div className="space-y-6">
                    <div data-cv-section="edu-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
                            <h3 className="text-md font-bold text-gray-900">University of Ruhuna, Sri Lanka</h3>
                            <span className="text-xs font-bold text-gray-500 mt-1 md:mt-0">{experience[1].duration}</span>
                        </div>
                        <p className="text-sm text-gray-700">BSc. (Hons) in Computer Engineering - GPA: 3.3</p>
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div className="mb-10" data-cv-section="skills">
                <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: blueAccent }}>Skills</h2>
                <div className="h-0.5 w-full bg-gray-200 mb-6"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {skillCategories.map((cat, i) => (
                        <div key={i} className="flex flex-col">
                            <span className="text-sm font-bold text-gray-800 mb-1">{cat.category}:</span>
                            <span className="text-sm text-gray-600 leading-relaxed">{cat.skills.join(', ')}.</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certificate */}
            <div className="mb-10" data-cv-section="certificates">
                <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: blueAccent }}>Certificate</h2>
                <div className="h-0.5 w-full bg-gray-200 mb-6"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.slice(0, 4).map((cert, index) => (
                        <div key={index} className="flex flex-col">
                            <h3 className="text-sm font-bold text-gray-900">{cert.title}</h3>
                            <p className="text-xs text-gray-500">Issued by {cert.issuer} ({cert.date})</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Award */}
            <div className="mb-10" data-cv-section="awards">
                <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: blueAccent }}>Award</h2>
                <div className="h-0.5 w-full bg-gray-200 mb-6"></div>

                <div className="space-y-4">
                    {achievements.slice(0, 2).map((ach, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">{ach.title}</span>
                            <span className="text-sm text-gray-600 font-medium">{ach.issuer}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ClassicTemplate;
