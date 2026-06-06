import { useState, useRef } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import profileImage from "../assets/images/dp.png";
import {
    Briefcase,
    GraduationCap,
    Code2,
    Mail,
    MapPin,
    Zap,
    ShieldCheck,
    Layers,
    Download,
    Send,
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
} from "../constants/landingPageData";

const HireMeSection = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const cvRef = useRef<HTMLDivElement>(null);

    const handleDownloadCV = async () => {
        if (!cvRef.current || isGenerating) return;
        setIsGenerating(true);

        try {
            const cvElement = cvRef.current;

            // Capture the CV element at 2x resolution for crisp output
            const canvas = await html2canvas(cvElement, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#080808',
                logging: false,
                windowWidth: cvElement.scrollWidth,
                windowHeight: cvElement.scrollHeight,
            });

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // A4 dimensions in points
            const a4Width = 595.28;
            const a4Height = 841.89;

            // Padding specifically for pages after the first one
            const topPaddingForSubsequentPages = 30;

            // Scale factor to map CSS pixels to PDF points (edge-to-edge)
            const scaleToPoints = a4Width / cvElement.scrollWidth;

            // Content height limits
            const heightLimitP1 = (a4Height / scaleToPoints) * 2;
            const heightLimitPN = ((a4Height - topPaddingForSubsequentPages) / scaleToPoints) * 2;

            // Get section break points
            const sections = cvElement.querySelectorAll('[data-cv-section]');
            const cvRect = cvElement.getBoundingClientRect();

            const breakPoints: number[] = [0];
            sections.forEach((section) => {
                const sectionRect = section.getBoundingClientRect();
                const relativeTop = (sectionRect.top - cvRect.top) * 2;
                if (relativeTop > 0 && relativeTop < imgHeight) {
                    breakPoints.push(Math.round(relativeTop));
                }
            });
            breakPoints.push(imgHeight);

            // Remove duplicates and sort
            const uniqueBreaks = [...new Set(breakPoints)].sort((a, b) => a - b);

            const pages: { startY: number; endY: number }[] = [];
            let currentPageStart = 0;

            let i = 1;
            while (i < uniqueBreaks.length) {
                const potentialPageEnd = uniqueBreaks[i];
                const heightWithNextSection = potentialPageEnd - currentPageStart;

                // Use P1 limit for the first page, PN limit for others
                const currentLimit = pages.length === 0 ? heightLimitP1 : heightLimitPN;

                if (heightWithNextSection > currentLimit) {
                    if (uniqueBreaks[i - 1] > currentPageStart) {
                        pages.push({
                            startY: currentPageStart,
                            endY: uniqueBreaks[i - 1],
                        });
                        currentPageStart = uniqueBreaks[i - 1];
                    } else {
                        pages.push({
                            startY: currentPageStart,
                            endY: uniqueBreaks[i],
                        });
                        currentPageStart = uniqueBreaks[i];
                        i++;
                    }
                } else {
                    i++;
                }
            }

            if (currentPageStart < imgHeight) {
                pages.push({
                    startY: currentPageStart,
                    endY: imgHeight,
                });
            }

            // Prepare text layer for ATS
            const textElements = Array.from(cvElement.querySelectorAll('h1, h2, h3, h4, p, li, span, a, div, h2 > span'))
                .filter(el => {
                    const hasDirectText = Array.from(el.childNodes).some(node =>
                        node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
                    );
                    return hasDirectText;
                });

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
                compress: true, // Internal PDF compression
            });

            const linkElements = cvElement.querySelectorAll('.cv-link');

            for (let j = 0; j < pages.length; j++) {
                if (j > 0) pdf.addPage();

                const { startY, endY } = pages[j];
                const sliceHeight = endY - startY;

                // Add Text Layer (Invisible to humans, readable by ATS) for ATS Scanners
                pdf.setTextColor(200, 200, 200); // Use a light gray (hidden behind the image)
                pdf.setFont('helvetica', 'normal');

                textElements.forEach((el) => {
                    const rect = el.getBoundingClientRect();
                    const elTopInCanvasPixels = (rect.top - cvRect.top) * 2;
                    const elBottomInCanvasPixels = (rect.bottom - cvRect.top) * 2;

                    // Check if element is visible on this page
                    if (elTopInCanvasPixels < endY && elBottomInCanvasPixels > startY) {
                        const style = window.getComputedStyle(el);
                        const fontSizeInPoints = parseFloat(style.fontSize) * scaleToPoints;
                        const x = (rect.left - cvRect.left) * scaleToPoints;
                        const currentTopPaddingInPoints = j === 0 ? 0 : topPaddingForSubsequentPages;
                        const y = ((elTopInCanvasPixels - startY) / 2 * scaleToPoints) + currentTopPaddingInPoints + (fontSizeInPoints * 0.8); // +fontSize*0.8 for baseline alignment

                        // Extract clean text (excluding Lucide icons text if any)
                        const text = Array.from(el.childNodes)
                            .filter(node => node.nodeType === Node.TEXT_NODE)
                            .map(node => node.textContent?.trim())
                            .filter(Boolean)
                            .join(' ');

                        if (text) {
                            pdf.setFontSize(fontSizeInPoints);
                            // Also check weight
                            const fontWeight = style.fontWeight;
                            if (parseInt(fontWeight) >= 700 || fontWeight === 'bold') {
                                pdf.setFont('helvetica', 'bold');
                            } else {
                                pdf.setFont('helvetica', 'normal');
                            }
                            pdf.text(text, x, y);
                        }
                    }
                });

                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = imgWidth;
                pageCanvas.height = Math.round(a4Height / scaleToPoints * 2);
                const ctx = pageCanvas.getContext('2d')!;

                ctx.fillStyle = '#080808';
                ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

                // No offset for 1st page, but use padding for others
                const verticalOffsetInCanvas = j === 0 ? 0 : (topPaddingForSubsequentPages / scaleToPoints * 2);

                ctx.drawImage(
                    canvas,
                    0, startY, imgWidth, sliceHeight,
                    0, verticalOffsetInCanvas, imgWidth, sliceHeight
                );

                // Use JPEG with 0.8 quality to drastically reduce file size from 50MB+ to ~2-5MB
                const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.8);
                pdf.addImage(pageImgData, 'JPEG', 0, 0, a4Width, a4Height, undefined, 'FAST');

                const pageStartYInCanvasPixels = startY;
                const pageEndYInCanvasPixels = endY;

                linkElements.forEach((el) => {
                    const rect = el.getBoundingClientRect();
                    const elTopInCanvasPixels = (rect.top - cvRect.top) * 2;
                    const elBottomInCanvasPixels = (rect.bottom - cvRect.top) * 2;

                    if (elTopInCanvasPixels < pageEndYInCanvasPixels && elBottomInCanvasPixels > pageStartYInCanvasPixels) {
                        const href = (el as HTMLAnchorElement).href;
                        if (href) {
                            const x = (rect.left - cvRect.left) * scaleToPoints;
                            // Add padding offset starting from 2nd page
                            const currentTopPaddingInPoints = j === 0 ? 0 : topPaddingForSubsequentPages;
                            const y = ((elTopInCanvasPixels - pageStartYInCanvasPixels) / 2 * scaleToPoints) + currentTopPaddingInPoints;
                            const w = rect.width * scaleToPoints;
                            const h = rect.height * scaleToPoints;

                            pdf.link(x, y, w, h, { url: href });
                        }
                    }
                });
            }

            pdf.save(`${personalInfo.firstName}_${personalInfo.lastName}_CV.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            window.print();
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSmoothScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <>
            <section
                id="hire"
                className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10"
            >
                <div className="max-w-[1440px] w-full space-y-10">
                    <SectionTitle
                        title="Hire Me"
                        subtitle="Open to new opportunities — let's build something great together"
                    />

                    <ScrollAnimation direction="up">
                        <div className="relative overflow-hidden bg-gradient-to-r from-green-500/10 via-green-600/5 to-green-500/10 border border-green-500/30 rounded-3xl p-6 md:p-8">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                                        <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-30"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                                            Status: Available for Hire
                                        </h3>
                                        <p className="text-gray-400 text-sm md:text-base mt-1 italic uppercase tracking-widest font-mono">
                                            [Full-time • Contract • Freelance • Remote]
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="#contact"
                                        onClick={(e) => handleSmoothScroll(e, "#contact")}
                                        className="px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 hover:bg-green-500/30 hover:border-green-500 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 active:scale-100 transition-all duration-300 font-bold text-sm md:text-base flex items-center gap-2 uppercase tracking-wider"
                                    >
                                        <Send size={18} />
                                        Contact Me
                                    </a>
                                    <button
                                        onClick={handleDownloadCV}
                                        disabled={isGenerating}
                                        className="px-6 py-3 bg-transparent border border-gray-600 rounded-xl text-gray-300 hover:border-green-500/50 hover:text-green-400 hover:scale-105 hover:bg-green-500/10 active:scale-100 transition-all duration-300 font-bold text-sm md:text-base disabled:opacity-50 flex items-center gap-2 uppercase tracking-wider"
                                    >
                                        <Download size={18} className={isGenerating ? "animate-bounce" : ""} />
                                        {isGenerating ? "Generating..." : "Download Full CV"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>

                    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                        <div
                            ref={cvRef}
                            id="cv-preview"
                            className="bg-[#080808] border border-green-500/30 rounded-3xl overflow-hidden hover:border-green-500/50 transition-all duration-700 shadow-2xl hover:shadow-green-500/20 min-w-[320px]"
                        >
                            {/* CV Header */}
                            <div data-cv-section="header" className="bg-gradient-to-r from-[#111] via-[#0a0a0a] to-[#111] border-b border-green-500/30 p-8 md:p-12">
                                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-green-500/20 rounded-3xl blur-2xl group-hover:bg-green-500/40 transition-all duration-500"></div>
                                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-[#111] border-2 border-green-500/40 p-1 flex items-center justify-center overflow-hidden transform group-hover:scale-105 transition-all duration-500">
                                            <img
                                                src={profileImage}
                                                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                                                className="w-full h-full object-cover rounded-2xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center lg:text-left space-y-4">
                                        <div>
                                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                                                {personalInfo.firstName} {personalInfo.lastName}
                                            </h2>
                                            <p className="text-green-400 font-bold text-xl md:text-2xl mt-2 flex items-center justify-center lg:justify-start gap-3">
                                                <Terminal size={24} />
                                                {personalInfo.title}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3 text-sm text-gray-400 font-medium">
                                            <span className="flex items-center gap-2 hover:text-white transition-colors">
                                                <MapPin size={16} className="text-red-500" />
                                                {personalInfo.location}
                                            </span>
                                            <a href={`mailto:${personalInfo.email}`} className="cv-link flex items-center gap-2 hover:text-white transition-colors">
                                                <Mail size={16} className="text-blue-500" />
                                                {personalInfo.email}
                                            </a>
                                            <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="cv-link flex items-center gap-2 hover:text-white transition-colors">
                                                <Phone size={16} className="text-green-500" />
                                                {personalInfo.phone}
                                            </a>
                                            <span className="flex items-center gap-2">
                                                <MapPin size={16} className="text-red-500" />
                                                {personalInfo.location}
                                            </span>
                                            <div className="flex gap-4 pt-1">
                                                <a href="https://github.com/DulshanSiriwardhana" target="_blank" className="cv-link hover:text-white transition-colors">
                                                    <Terminal size={18} />
                                                    <span className="sr-only">GitHub: github.com/DulshanSiriwardhana</span>
                                                </a>
                                                <a href="https://linkedin.com/in/dulshans" target="_blank" className="cv-link hover:text-white transition-colors">
                                                    <Briefcase size={18} />
                                                    <span className="sr-only">LinkedIn: linkedin.com/in/dulshans</span>
                                                </a>
                                                <a href="https://facebook.com/profile.php?id=61568544393764" target="_blank" className="cv-link hover:text-white transition-colors">
                                                    <Share2 size={18} />
                                                    <span className="sr-only">Facebook: Rasindu Dulshan Siriwardhana</span>
                                                </a>
                                                <a href="https://medium.com/@dulshansiriwardhanaofficial" target="_blank" className="cv-link hover:text-white transition-colors">
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
                                    <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-3">
                                        <Search size={22} className="text-blue-500" />
                                        PROFESSIONAL SUMMARY
                                        <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent ml-4"></div>
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed text-sm md:text-lg font-medium font-spectral italic border-l-4 border-green-500/20 pl-6 py-2">
                                        Professional Summary: {personalInfo.bio} Dedicated Full-Stack Engineer with a deep focus on performance optimization, distributed systems, and modern architectural patterns. Expert in delivering high-fidelity user experiences and robust backend infrastructures.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                    {/* Experience Column */}
                                    <div className="space-y-10">
                                        <div data-cv-section="experience">
                                            <h3 className="text-xl font-bold text-green-400 mb-8 flex items-center gap-3">
                                                <Briefcase size={22} className="text-orange-500" />
                                                WORK EXPERIENCE
                                                <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent ml-4"></div>
                                            </h3>
                                            <div className="space-y-10">
                                                {experience.map((exp, index) => (
                                                    <div key={index} data-cv-section={`exp-${index}`} className="relative group pl-8">
                                                        <div className="absolute left-0 top-0 bottom-0 w-px bg-green-500/20 group-hover:bg-green-500/50 transition-all"></div>
                                                        <div className="absolute left-[-4px] top-2 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                                        <h4 className="text-white font-bold text-base md:text-lg uppercase group-hover:text-green-400 transition-colors">
                                                            {exp.position}
                                                        </h4>
                                                        <p className="text-green-400/80 text-sm font-bold tracking-widest uppercase mt-1">
                                                            {exp.company}, Colombo, Sri Lanka
                                                        </p>
                                                        <div className="flex items-center gap-2 text-gray-500 text-xs mt-1 font-mono uppercase tracking-tighter">
                                                            <Calendar size={12} />
                                                            {exp.duration}
                                                        </div>
                                                        <ul className="mt-4 space-y-2">
                                                            {exp.description.map((item, i) => (
                                                                <li key={i} className="text-gray-400 text-xs md:text-sm flex items-start gap-3 group/li">
                                                                    <ChevronRight size={14} className="text-green-500 flex-shrink-0 mt-1 group-hover/li:translate-x-1 transition-transform" />
                                                                    <span className="group-hover/li:text-gray-200 transition-colors">{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div data-cv-section="achievements">
                                            <h3 className="text-xl font-bold text-green-400 mb-8 flex items-center gap-3">
                                                <Trophy size={22} className="text-yellow-500" />
                                                KEY ACHIEVEMENTS
                                                <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent ml-4"></div>
                                            </h3>
                                            <div className="space-y-4">
                                                {achievements.map((ach, index) => (
                                                    <div key={index} data-cv-section={`ach-${index}`} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-green-500/5 hover:border-green-500/30 transition-all group">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h4 className="text-white font-bold text-sm md:text-base group-hover:text-green-400 transition-all uppercase">{ach.title}</h4>
                                                            <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-bold border border-green-500/20">{ach.date}</span>
                                                        </div>
                                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-tight mb-2 italic">{ach.issuer}</p>
                                                        <p className="text-gray-400 text-xs md:text-sm">{ach.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Education & Skills Column */}
                                    <div className="space-y-12">
                                        <div data-cv-section="education">
                                            <h3 className="text-xl font-bold text-green-400 mb-8 flex items-center gap-3">
                                                <GraduationCap size={22} className="text-yellow-500" />
                                                EDUCATION
                                                <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent ml-4"></div>
                                            </h3>
                                            <div className="space-y-6">
                                                <div data-cv-section="edu-1" className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-green-500/40 transition-all group">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="text-white font-bold text-lg uppercase group-hover:text-green-400">BSc. (Hons) in Computer Engineering</h4>
                                                        <span className="text-xs text-gray-500 font-mono">University of Ruhuna, Sri Lanka, {experience[1].duration}</span>
                                                    </div>
                                                    <p className="text-gray-300 text-sm font-bold italic">Specializing in Software Architecture and AI</p>
                                                    <div className="flex items-center gap-4 mt-4">
                                                        <div className="flex items-center gap-2 text-green-400 text-xs font-black px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full uppercase tracking-widest">
                                                            <Award size={14} />
                                                            GPA: 3.3
                                                        </div>
                                                    </div>
                                                </div>
                                                <div data-cv-section="edu-2" className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-green-500/40 transition-all group">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="text-white font-bold text-lg uppercase group-hover:text-green-400">Advanced Level</h4>
                                                        <span className="text-xs text-gray-500 font-mono">JAN 2019</span>
                                                    </div>
                                                    <p className="text-gray-300 text-sm font-bold italic">Ch/Senanayaka Central College, Physical Science</p>
                                                    <div className="mt-4 flex items-center gap-4">
                                                        <span className="text-green-400 text-xs font-black px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full tracking-[0.2em]">ABB</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div data-cv-section="skills">
                                            <h3 className="text-xl font-bold text-green-400 mb-8 flex items-center gap-3">
                                                <Code2 size={24} className="text-purple-400" />
                                                TECHNICAL SKILLS
                                                <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent ml-4"></div>
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
                                                            <span className="text-gray-300 group-hover:text-white transition-colors">{skill.skill}</span>
                                                            <span className="text-green-400 italic">{skill.level}%</span>
                                                        </div>
                                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-green-600 via-green-400 to-green-300 rounded-full transition-all duration-1000"
                                                                style={{ width: `${skill.level}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-8 grid grid-cols-1 gap-4">
                                                {skillCategories.map((cat, i) => (
                                                    <div key={i} className="p-4 bg-black/40 border border-white/5 rounded-2xl group transition-all">
                                                        <p className="text-[10px] text-gray-600 font-black mb-3 uppercase tracking-[0.3em] flex items-center gap-2">
                                                            <Layers size={12} className="text-green-500/50" />
                                                            {cat.category}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {cat.skills.map((s, j) => (
                                                                <span key={j} className="text-[10px] md:text-xs text-green-400/80 font-bold px-2 py-1 bg-green-500/5 border border-green-500/10 rounded-lg group-hover:border-green-500/30 transition-all uppercase tracking-tight">
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
                                    <h3 className="text-xl font-bold text-green-400 mb-8 flex items-center gap-3">
                                        <ShieldCheck size={24} className="text-emerald-500" />
                                        CERTIFICATES
                                        <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent ml-4"></div>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {certificates.map((cert, index) => (
                                            <a key={index} href={cert.link} target="_blank" className="cv-link p-5 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between hover:bg-green-500/5 hover:border-green-500/30 transition-all group">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <CheckCircle2 size={16} className="text-green-500 opacity-50" />
                                                        <span className="text-[10px] text-gray-600 font-mono italic">{cert.date}</span>
                                                    </div>
                                                    <h4 className="text-white font-bold text-sm uppercase group-hover:text-green-400 transition-colors leading-tight mb-2">
                                                        {cert.title}
                                                    </h4>
                                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{cert.issuer}</p>
                                                </div>
                                                <ExternalLink size={12} className="mt-4 text-green-500/40 group-hover:text-green-500 transition-all self-end" />
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Full Projects Section */}
                                <div data-cv-section="projects">
                                    <h3 className="text-xl font-bold text-green-400 mb-8 flex items-center gap-3">
                                        <Code2 size={24} className="text-cyan-400" />
                                        KEY PROJECTS
                                        <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent ml-4"></div>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {projects.map((proj, index) => (
                                            <div key={index} data-cv-section={`proj-${index}`} className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-green-500/30 transition-all group h-full flex flex-col">
                                                <h4 className="text-white font-black text-base uppercase mb-3 flex items-center justify-between">
                                                    {proj.title}
                                                    {proj.featured && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                                                </h4>
                                                <p className="text-gray-400 text-xs md:text-sm leading-relaxed flex-grow italic mb-4">
                                                    {proj.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {proj.tech.slice(0, 4).map((t, i) => (
                                                        <span key={i} className="text-[8px] md:text-[10px] text-green-500/80 border border-green-500/20 px-2 py-0.5 rounded-md font-black uppercase">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 pt-4 border-t border-white/5">
                                                    <a href={proj.github} target="_blank" className="cv-link hover:text-green-400 transition-all uppercase flex items-center gap-1.5">
                                                        <Terminal size={12} /> Source
                                                    </a>
                                                    <a href={proj.link} target="_blank" className="cv-link hover:text-green-400 transition-all uppercase flex items-center gap-1.5">
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
                                        <h3 className="text-xl font-bold text-green-400 mb-8 flex items-center gap-3">
                                            <Terminal size={22} className="text-white" />
                                            ONLINE PROFILES & STATS
                                            <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent ml-4"></div>
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {stats.map((s, index) => (
                                                <div key={index} className="p-6 bg-black/40 border border-white/5 rounded-3xl text-center group hover:border-green-500/30 transition-all">
                                                    <p className="text-3xl font-black text-white group-hover:text-green-400 transition-colors tracking-tighter">
                                                        {s.value}{s.suffix}
                                                    </p>
                                                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">{s.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 p-6 bg-white/5 border border-white/5 rounded-3xl space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Top 10 Contributor</span>
                                                <span className="text-xs font-black text-green-400">SRI LANKA</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Public Repos</span>
                                                <span className="text-xs font-black text-green-400">100+</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Commits</span>
                                                <span className="text-xs font-black text-green-400">3800+</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-green-400 mb-8 flex items-center gap-3">
                                            <BookOpen size={22} className="text-blue-400" />
                                            PUBLICATIONS & PRESENTATIONS
                                            <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent ml-4"></div>
                                        </h3>
                                        <div className="space-y-6">
                                            {blogArticles.map((art, index) => (
                                                <a key={index} href={art.url} target="_blank" className="cv-link block p-6 bg-white/5 border border-white/10 rounded-3xl hover:border-green-500/40 transition-all group">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h4 className="text-white font-bold text-base md:text-lg uppercase leading-tight group-hover:text-green-400">{art.title}</h4>
                                                        <PenTool size={16} className="text-blue-500/50" />
                                                    </div>
                                                    <p className="text-gray-400 text-xs md:text-sm italic mb-4">{art.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {art.tags.map((t, i) => (
                                                            <span key={i} className="text-[10px] text-blue-400/80 bg-blue-500/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{t}</span>
                                                        ))}
                                                    </div>
                                                </a>
                                            ))}
                                            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="text-white font-bold text-base uppercase group-hover:text-green-400">Presenter – Rextro 2026</h4>
                                                    <User size={16} className="text-yellow-500/50" />
                                                </div>
                                                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                                    Demonstrated a technical project to a live audience, explaining system architecture and answering technical questions on practical engineering applications.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* References */}
                                <div data-cv-section="references">
                                    <h3 className="text-xl font-bold text-green-400 mb-8 flex items-center gap-3 uppercase tracking-tighter">
                                        <CheckCircle2 size={24} className="text-green-500" />
                                        REFERENCES
                                        <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent ml-4"></div>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {references.map((ref, index) => (
                                            <div key={index} className="p-8 bg-white/5 border border-white/5 rounded-3xl group hover:border-green-500/30 transition-all">
                                                <h4 className="text-white font-black text-xl uppercase mb-2 group-hover:text-green-400">{ref.name}</h4>
                                                <p className="text-green-400/70 text-xs font-bold uppercase tracking-widest mb-1">{ref.role}</p>
                                                <p className="text-gray-500 text-xs font-medium italic mb-6">{ref.organization}</p>
                                                <div className="space-y-2">
                                                    <a href={`mailto:${ref.email}`} className="cv-link flex items-center gap-3 text-sm text-gray-300 font-mono hover:text-green-400 transition-colors">
                                                        <Mail size={14} className="text-blue-500" /> {ref.email}
                                                    </a>
                                                    <a href={`tel:${ref.phone}`} className="cv-link flex items-center gap-3 text-sm text-gray-300 font-mono hover:text-green-400 transition-colors">
                                                        <Phone size={14} className="text-green-500" /> {ref.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                        {[
                            {
                                title: "Full-Stack Native",
                                desc: "End-to-end expertise from high-performance C++ engines to interactive React frontends.",
                                icon: <Zap className="text-yellow-400" size={24} />
                            },
                            {
                                title: "Blockchain Architect",
                                desc: "Designing secure, transparent ecosystems with Solidity smart contracts and Web3 integration.",
                                icon: <ShieldCheck className="text-emerald-400" size={24} />
                            },
                            {
                                title: "Engineering Mindset",
                                desc: "Focus on performance, scalability, and distributed systems with a 3.3 GPA academic core.",
                                icon: <Code2 className="text-purple-400" size={24} />
                            },
                        ].map((item, index) => (
                            <ScrollAnimation key={index} direction="up" delay={index * 100 + 200}>
                                <div className="group bg-[#111]/80 backdrop-blur-md border border-green-500/10 rounded-2xl p-8 hover:border-green-500/40 hover:bg-[#1a1a1a]/60 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2 h-full">
                                    <div className="mb-6 p-3 bg-white/5 rounded-xl inline-block group-hover:scale-110 group-hover:bg-green-500/10 transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors uppercase tracking-tight">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>
                            </ScrollAnimation>
                        ))}
                    </div>

                    <ScrollAnimation direction="up" delay={300}>
                        <div className="text-center space-y-6 pt-10 pb-20">
                            <p className="text-gray-300 text-lg md:text-xl font-medium">
                                Looking for a high-performance engineer to join your mission?
                            </p>
                            <div className="flex flex-wrap justify-center gap-5">
                                <a
                                    href="#contact"
                                    onClick={(e) => handleSmoothScroll(e, "#contact")}
                                    className="group px-10 py-5 bg-green-500/10 border border-green-500/40 rounded-2xl text-green-400 hover:bg-green-500 hover:text-black hover:scale-105 active:scale-95 transition-all duration-500 font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-lg hover:shadow-green-500/30"
                                >
                                    <Send size={22} />
                                    Initiate Session
                                </a>
                                <a
                                    href={`mailto:${personalInfo.email}?subject=Job Opportunity&body=Hi Dulshan,%0D%0A%0D%0AI came across your portfolio and I'd like to discuss a potential opportunity.%0D%0A%0D%0ABest regards`}
                                    className="px-10 py-5 bg-transparent border border-gray-700 rounded-2xl text-gray-400 hover:border-white hover:text-white hover:scale-105 active:scale-95 transition-all duration-500 font-black uppercase tracking-[0.2em] flex items-center gap-3"
                                >
                                    <Mail size={22} />
                                    Direct Link
                                </a>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            </section>


        </>
    );
};

export default HireMeSection;
