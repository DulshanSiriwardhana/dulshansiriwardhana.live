import { useState, useRef, useEffect } from "react";
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
import { getCvTheme } from "../utils/api";
import { themes } from "../constants/themeConfig";

const HireMeSection = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const cvRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState('emerald');

    useEffect(() => {
        const fetchTheme = async () => {
            const data = await getCvTheme();
            if (data && data.value) setTheme(data.value);
        };
        fetchTheme();
    }, []);

    const colorMap: Record<string, string> = {
        emerald: '#10b981',
        ruby: '#e11d48',
        rose: '#f43f5e',
        blue: '#3b82f6',
        amber: '#f59e0b',
        slate: '#64748b',
        violet: '#8b5cf6',
        orange: '#f97316',
        purple: '#a855f7',
        indigo: '#6366f1',
        lime: '#84cc16',
        green: '#22c55e',
        red: '#ef4444',
        pink: '#ec4899',
        teal: '#14b8a6',
        yellow: '#eab308'
    };

    const currentTheme = themes.find(t => t.id === theme) || themes[0];
    const t = currentTheme;
    const c = t.baseColor;

    // Theme-aware color modifiers
    const accentText = t.isDark ? `text-${c}-400` : `text-${c}-600`;
    const accentMutedText = t.isDark ? `text-${c}-400/80` : `text-${c}-600/80`;
    const accentBorder = t.isDark ? `border-${c}-500/30` : `border-${c}-500/50`;
    const accentBg = t.isDark ? `bg-${c}-500/20` : `bg-${c}-500/10`;
    const accentGlow = t.isDark ? `shadow-${c}-500/20` : `shadow-${c}-500/10`;

    const handleDownloadCV = async () => {
        if (!cvRef.current || isGenerating) return;
        setIsGenerating(true);

        try {
            const cvElement = cvRef.current;

            // Extract the hex color from the tailwind class bg-[#xxxxxx]
            const themeHexMatch = t.backgroundColor.match(/\[(.*?)\]/);
            const themeBgColor = themeHexMatch ? themeHexMatch[1] : (t.isDark ? '#080808' : '#ffffff');

            // Store original styles to restore them manually (className restoration can be flakey during async)
            const originalBorder = cvElement.style.border;
            const originalRadius = cvElement.style.borderRadius;
            const originalShadow = cvElement.style.boxShadow;

            // Force override styles for the PDF capture (using setProperty for !important)
            cvElement.style.setProperty('border', 'none', 'important');
            cvElement.style.setProperty('border-radius', '0', 'important');
            cvElement.style.setProperty('box-shadow', 'none', 'important');

            // Capture the CV element at 2x resolution for crisp output
            const canvas = await html2canvas(cvElement, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: themeBgColor,
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

                // Use the theme's background color instead of hardcoded #080808
                ctx.fillStyle = themeBgColor;
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
            // RESTORE original styles to the UI preview
            if (cvRef.current) {
                cvRef.current.style.borderRadius = originalRadius;
                cvRef.current.style.border = originalBorder;
                cvRef.current.style.boxShadow = originalShadow;
            }
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
                        <div className={`relative overflow-hidden bg-gradient-to-r from-${c}-500/10 via-${c}-600/5 to-${c}-500/10 border border-${c}-500/30 rounded-3xl p-6 md:p-8`}>
                            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${c}-400 to-transparent`}></div>
                            <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${c}-400/50 to-transparent`}></div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className={`w-4 h-4 rounded-full animate-pulse ${t.isDark ? `bg-${c}-400` : `bg-${c}-500`}`}></div>
                                        <div className={`absolute inset-0 w-4 h-4 rounded-full animate-ping opacity-30 ${t.isDark ? `bg-${c}-400` : `bg-${c}-500`}`}></div>
                                    </div>
                                    <div>
                                        <h3 className={`text-xl md:text-2xl font-bold ${t.textColor} flex items-center gap-2`}>
                                            Status: Available for Hire
                                        </h3>
                                        <p className={`${t.mutedTextColor} text-sm md:text-base mt-1 italic uppercase tracking-widest font-mono`}>
                                            [Full-time • Contract • Freelance • Remote]
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="#contact"
                                        onClick={(e) => handleSmoothScroll(e, "#contact")}
                                        className={`px-6 py-3 ${accentBg} border ${accentBorder} rounded-xl ${accentText} hover:bg-${c}-500/30 hover:border-${c}-500 hover:scale-105 hover:shadow-lg ${accentGlow} active:scale-100 transition-all duration-300 font-bold text-sm md:text-base flex items-center gap-2 uppercase tracking-wider`}
                                    >
                                        <Send size={18} />
                                        Contact Me
                                    </a>
                                    <button
                                        onClick={handleDownloadCV}
                                        disabled={isGenerating}
                                        className={`px-6 py-3 bg-transparent border border-gray-600 rounded-xl ${t.mutedTextColor} hover:border-${c}-500/50 hover:${accentText} hover:scale-105 hover:bg-${c}-500/10 active:scale-100 transition-all duration-300 font-bold text-sm md:text-base disabled:opacity-50 flex items-center gap-2 uppercase tracking-wider`}
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
                                        Professional Summary: {personalInfo.bio} Dedicated Full-Stack Engineer with a deep focus on performance optimization, distributed systems, and modern architectural patterns. Expert in delivering high-fidelity user experiences and robust backend infrastructures.
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
                                                        {art.tags.map((t, i) => (
                                                            <span key={i} className="text-[10px] text-blue-400/80 bg-blue-500/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{t}</span>
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
                                                    <a href={`tel:${ref.phone}`} className={`cv-link flex items-center gap-3 text-sm ${t.mutedTextColor} font-mono hover:${accentText} transition-colors`}>
                                                        <Phone size={14} className={`${accentText}`} /> {ref.phone}
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
                                icon: <ShieldCheck className={`${accentText}`} size={24} />
                            },
                            {
                                title: "Engineering Mindset",
                                desc: "Focus on performance, scalability, and distributed systems with a 3.3 GPA academic core.",
                                icon: <Code2 className="text-purple-400" size={24} />
                            },
                        ].map((item, index) => (
                            <ScrollAnimation key={index} direction="up" delay={index * 100 + 200}>
                                <div className={`group ${t.backgroundColor}/80 backdrop-blur-md border ${t.borderColor} rounded-2xl p-8 hover:border-${c}-500/40 hover:bg-white/5 hover:shadow-2xl hover:shadow-${c}-500/10 transition-all duration-500 hover:-translate-y-2 h-full`}>
                                    <div className={`mb-6 p-3 ${t.cardColor} rounded-xl inline-block group-hover:scale-110 group-hover:bg-${c}-500/10 transition-all duration-500`}>
                                        {item.icon}
                                    </div>
                                    <h4 className={`text-xl font-bold ${t.textColor} mb-3 group-hover:${accentText} transition-colors uppercase tracking-tight`}>
                                        {item.title}
                                    </h4>
                                    <p className={`${t.mutedTextColor} text-sm leading-relaxed font-medium`}>
                                        {item.desc}
                                    </p>
                                </div>
                            </ScrollAnimation>
                        ))}
                    </div>

                    <ScrollAnimation direction="up" delay={300}>
                        <div className="text-center space-y-6 pt-10 pb-20">
                            <p className={`${t.textColor} text-lg md:text-xl font-medium opacity-80`}>
                                Looking for a high-performance engineer to join your mission?
                            </p>
                            <div className="flex flex-wrap justify-center gap-5">
                                <a
                                    href="#contact"
                                    onClick={(e) => handleSmoothScroll(e, "#contact")}
                                    className={`group px-10 py-5 ${accentBg} border ${accentBorder} rounded-2xl ${accentText} hover:bg-${c}-500 hover:text-black hover:scale-105 active:scale-95 transition-all duration-500 font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-lg ${accentGlow}`}
                                >
                                    <Send size={22} />
                                    Initiate Session
                                </a>
                                <a
                                    href={`mailto:${personalInfo.email}?subject=Job Opportunity&body=Hi Dulshan,%0D%0A%0D%0AI came across your portfolio and I'd like to discuss a potential opportunity.%0D%0A%0D%0ABest regards`}
                                    className={`px-10 py-5 bg-transparent border ${t.borderColor} rounded-2xl ${t.mutedTextColor} hover:border-${c}-500 hover:${t.textColor} hover:scale-105 active:scale-95 transition-all duration-500 font-black uppercase tracking-[0.2em] flex items-center gap-3`}
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
