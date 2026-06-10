import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import {
    Download,
    Send,
    Zap,
    Code2,
    Mail
} from "lucide-react";
import {
    personalInfo
} from "../constants/landingPageData";
import { getCvTheme, getCvTemplate } from "../utils/api";
import { themes } from "../constants/themeConfig";
import ModernTemplate from "../components/cv-templates/ModernTemplate";
import ClassicTemplate from "../components/cv-templates/ClassicTemplate";
import MinimalTemplate from "../components/cv-templates/MinimalTemplate";
import ExecutiveTemplate from "../components/cv-templates/ExecutiveTemplate";
import TechnicalTemplate from "../components/cv-templates/TechnicalTemplate";
import CreativeTemplate from "../components/cv-templates/CreativeTemplate";
import ElegantTemplate from "../components/cv-templates/ElegantTemplate";
import StartupTemplate from "../components/cv-templates/StartupTemplate";
import IndustrialTemplate from "../components/cv-templates/IndustrialTemplate";
import AcademicTemplate from "../components/cv-templates/AcademicTemplate";

const HireMeSection = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const cvRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState('emerald');
    const [cvTemplate, setCvTemplate] = useState('modern');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const themeData = await getCvTheme();
                if (themeData && themeData.value) setTheme(themeData.value);

                const templateData = await getCvTemplate();
                if (templateData && templateData.value) setCvTemplate(templateData.value);
            } catch (error) {
                console.error("Error fetching CV settings:", error);
            }
        };
        fetchSettings();
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

    const accentText = t.isDark ? `text-${c}-400` : `text-${c}-600`;
    const accentBorder = t.isDark ? `border-${c}-500/30` : `border-${c}-500/50`;
    const accentBg = t.isDark ? `bg-${c}-500/20` : `bg-${c}-500/10`;
    const accentGlow = t.isDark ? `shadow-${c}-500/20` : `shadow-${c}-500/10`;

    const handleDownloadCV = async () => {
        if (!cvRef.current || isGenerating) return;
        setIsGenerating(true);

        const cvElement = cvRef.current;
        const originalBorder = cvElement.style.border;
        const originalRadius = cvElement.style.borderRadius;
        const originalShadow = cvElement.style.boxShadow;

        try {
            const themeHexMatch = t.backgroundColor.match(/\[(.*?)\]/);
            const themeBgColor = themeHexMatch ? themeHexMatch[1] : (t.isDark ? '#080808' : '#ffffff');

            cvElement.style.setProperty('border', 'none', 'important');
            cvElement.style.setProperty('border-radius', '0', 'important');
            cvElement.style.setProperty('box-shadow', 'none', 'important');

            const imgElements = Array.from(cvElement.querySelectorAll('img')) as HTMLImageElement[];
            const originalSrcs = imgElements.map(img => img.src);

            await Promise.all(imgElements.map(img => new Promise<void>((resolve) => {
                const bakeToDataUrl = () => {
                    try {
                        const tmpCanvas = document.createElement('canvas');
                        tmpCanvas.width = img.naturalWidth || 200;
                        tmpCanvas.height = img.naturalHeight || 200;
                        tmpCanvas.getContext('2d')!.drawImage(img, 0, 0);
                        img.src = tmpCanvas.toDataURL('image/png');
                    } catch {
                    }
                    resolve();
                };
                if (img.complete && img.naturalWidth > 0) {
                    bakeToDataUrl();
                } else {
                    img.onload = bakeToDataUrl;
                    img.onerror = () => resolve();
                }
            })));

            const SCALE = 4;
            const canvas = await html2canvas(cvElement, {
                scale: SCALE,
                useCORS: true,
                allowTaint: true,
                backgroundColor: cvTemplate === 'modern' ? themeBgColor : '#ffffff',
                logging: false,
                windowWidth: cvElement.scrollWidth,
                windowHeight: cvElement.scrollHeight,
                imageTimeout: 15000,
            });

            imgElements.forEach((img, i) => { img.src = originalSrcs[i]; });

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const a4Width = 595.28;
            const a4Height = 841.89;
            const topPaddingForSubsequentPages = 30;
            const scaleToPoints = a4Width / cvElement.scrollWidth;

            const heightLimitP1 = (a4Height / scaleToPoints) * SCALE;
            const heightLimitPN = ((a4Height - topPaddingForSubsequentPages) / scaleToPoints) * SCALE;

            const sections = cvElement.querySelectorAll('[data-cv-section]');
            const cvRect = cvElement.getBoundingClientRect();

            const breakPoints: number[] = [0];
            sections.forEach((section) => {
                const sectionRect = section.getBoundingClientRect();
                const relativeTop = (sectionRect.top - cvRect.top) * SCALE;
                if (relativeTop > 0 && relativeTop < imgHeight) {
                    breakPoints.push(Math.round(relativeTop));
                }
            });
            breakPoints.push(imgHeight);

            const uniqueBreaks = [...new Set(breakPoints)].sort((a, b) => a - b);
            const pages: { startY: number; endY: number }[] = [];
            let currentPageStart = 0;

            let i = 1;
            while (i < uniqueBreaks.length) {
                const potentialPageEnd = uniqueBreaks[i];
                const heightWithNextSection = potentialPageEnd - currentPageStart;
                const currentLimit = pages.length === 0 ? heightLimitP1 : heightLimitPN;

                if (heightWithNextSection > currentLimit) {
                    if (uniqueBreaks[i - 1] > currentPageStart) {
                        pages.push({ startY: currentPageStart, endY: uniqueBreaks[i - 1] });
                        currentPageStart = uniqueBreaks[i - 1];
                    } else {
                        pages.push({ startY: currentPageStart, endY: uniqueBreaks[i] });
                        currentPageStart = uniqueBreaks[i];
                        i++;
                    }
                } else {
                    i++;
                }
            }

            if (currentPageStart < imgHeight) pages.push({ startY: currentPageStart, endY: imgHeight });

            const textElements = Array.from(cvElement.querySelectorAll('h1, h2, h3, h4, p, li, span, a, div, h2 > span'))
                .filter(el => Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()));

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
                compress: true,
                putOnlyUsedFonts: true,
            });

            const linkElements = cvElement.querySelectorAll('.cv-link');

            for (let j = 0; j < pages.length; j++) {
                if (j > 0) pdf.addPage();
                const { startY, endY } = pages[j];
                const sliceHeight = endY - startY;

                pdf.setTextColor(200, 200, 200);
                pdf.setFont('helvetica', 'normal');

                textElements.forEach((el) => {
                    const rect = el.getBoundingClientRect();
                    const elTopInCanvasPixels = (rect.top - cvRect.top) * SCALE;
                    const elBottomInCanvasPixels = (rect.bottom - cvRect.top) * SCALE;

                    if (elTopInCanvasPixels < endY && elBottomInCanvasPixels > startY) {
                        const style = window.getComputedStyle(el);
                        const fontSizeInPoints = parseFloat(style.fontSize) * scaleToPoints;
                        const x = (rect.left - cvRect.left) * scaleToPoints;
                        const currentTopPaddingInPoints = j === 0 ? 0 : topPaddingForSubsequentPages;
                        const y = ((elTopInCanvasPixels - startY) / SCALE * scaleToPoints) + currentTopPaddingInPoints + (fontSizeInPoints * 0.8);

                        const text = Array.from(el.childNodes)
                            .filter(node => node.nodeType === Node.TEXT_NODE)
                            .map(node => node.textContent?.trim())
                            .filter(Boolean)
                            .join(' ');

                        if (text) {
                            pdf.setFontSize(fontSizeInPoints);
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
                pageCanvas.height = Math.round(a4Height / scaleToPoints * SCALE);
                const ctx = pageCanvas.getContext('2d')!;
                ctx.fillStyle = cvTemplate === 'modern' ? themeBgColor : '#ffffff';
                ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

                const verticalOffsetInCanvas = j === 0 ? 0 : (topPaddingForSubsequentPages / scaleToPoints * SCALE);
                ctx.drawImage(canvas, 0, startY, imgWidth, sliceHeight, 0, verticalOffsetInCanvas, imgWidth, sliceHeight);

                const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
                pdf.addImage(pageImgData, 'JPEG', 0, 0, a4Width, a4Height, undefined, 'NONE');

                linkElements.forEach((el) => {
                    const rect = el.getBoundingClientRect();
                    const elTopInCanvasPixels = (rect.top - cvRect.top) * SCALE;
                    const elBottomInCanvasPixels = (rect.bottom - cvRect.top) * SCALE;
                    if (elTopInCanvasPixels < endY && elBottomInCanvasPixels > startY) {
                        const href = (el as HTMLAnchorElement).href;
                        if (href) {
                            const x = (rect.left - cvRect.left) * scaleToPoints;
                            const currentTopPaddingInPoints = j === 0 ? 0 : topPaddingForSubsequentPages;
                            const y = ((elTopInCanvasPixels - startY) / SCALE * scaleToPoints) + currentTopPaddingInPoints;
                            pdf.link(x, y, rect.width * scaleToPoints, rect.height * scaleToPoints, { url: href });
                        }
                    }
                });
            }

            pdf.save(`${personalInfo.firstName}_${personalInfo.lastName}_CV.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            if (cvRef.current) {
                cvRef.current.style.borderRadius = originalRadius;
                cvRef.current.style.border = originalBorder;
                cvRef.current.style.boxShadow = originalShadow;
            }
            setIsGenerating(false);
        }
    };

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const renderTemplate = () => {
        const props = { t, c, colorMap };
        switch (cvTemplate) {
            case 'classic': return <ClassicTemplate ref={cvRef} {...props} />;
            case 'minimal': return <MinimalTemplate ref={cvRef} {...props} />;
            case 'executive': return <ExecutiveTemplate ref={cvRef} {...props} />;
            case 'technical': return <TechnicalTemplate ref={cvRef} {...props} />;
            case 'creative': return <CreativeTemplate ref={cvRef} {...props} />;
            case 'elegant': return <ElegantTemplate ref={cvRef} {...props} />;
            case 'startup': return <StartupTemplate ref={cvRef} {...props} />;
            case 'industrial': return <IndustrialTemplate ref={cvRef} {...props} />;
            case 'academic': return <AcademicTemplate ref={cvRef} {...props} />;
            default: return <ModernTemplate ref={cvRef} {...props} />;
        }
    };

    return (
        <section id="hire" className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10">
            <div className="max-w-[1440px] w-full space-y-10">
                <SectionTitle title="Hire Me" subtitle="Open to new opportunities — let's build something great together" />

                <ScrollAnimation direction="up">
                    <div className={`relative overflow-hidden bg-gradient-to-r from-${c}-500/10 via-${c}-600/5 to-${c}-500/10 border border-${c}-500/30 rounded-3xl p-6 md:p-8`}>
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className={`w-4 h-4 rounded-full animate-pulse ${t.isDark ? `bg-${c}-400` : `bg-${c}-500`}`}></div>
                                    <div className={`absolute inset-0 w-4 h-4 rounded-full animate-ping opacity-30 ${t.isDark ? `bg-${c}-400` : `bg-${c}-500`}`}></div>
                                </div>
                                <div>
                                    <h3 className={`text-xl md:text-2xl font-bold ${t.textColor}`}>Status: Available for Hire</h3>
                                    <p className={`${t.mutedTextColor} text-sm md:text-base mt-1 italic uppercase tracking-widest font-mono`}>[Full-time • Contract • Freelance • Remote]</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <a href="#contact" onClick={(e) => handleSmoothScroll(e, "#contact")} className={`px-6 py-3 ${accentBg} border ${accentBorder} rounded-xl ${accentText} hover:bg-${c}-500/30 transition-all font-bold text-sm md:text-base uppercase tracking-wider flex items-center gap-2`}><Send size={18} /> Contact Me</a>
                                <button onClick={handleDownloadCV} disabled={isGenerating} className={`px-6 py-3 bg-transparent border border-gray-600 rounded-xl ${t.mutedTextColor} hover:border-${c}-500/50 hover:${accentText} transition-all font-bold text-sm md:text-base disabled:opacity-50 flex items-center gap-2 uppercase tracking-wider`}>
                                    <Download size={18} className={isGenerating ? "animate-bounce" : ""} /> {isGenerating ? "Generating..." : "Download Full CV"}
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>

                <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                    {renderTemplate()}
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
                            icon: <Zap className={accentText} size={24} />
                        },
                        {
                            title: "Engineering Mindset",
                            desc: "Focus on performance, scalability, and distributed systems with a 3.3 GPA academic core.",
                            icon: <Code2 className="text-purple-400" size={24} />
                        },
                    ].map((item, index) => (
                        <ScrollAnimation key={index} direction="up" delay={index * 100 + 200}>
                            <div className={`group ${t.backgroundColor}/80 backdrop-blur-md border ${t.borderColor} rounded-2xl p-8 hover:border-${c}-500/40 hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 h-full`}>
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
                            <a href="#contact" onClick={(e) => handleSmoothScroll(e, "#contact")} className={`group px-10 py-5 ${accentBg} border ${accentBorder} rounded-2xl ${accentText} hover:bg-${c}-500 hover:text-black hover:scale-105 transition-all duration-500 font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-lg ${accentGlow}`}>
                                <Send size={22} /> Initiate Session
                            </a>
                            <a href={`mailto:${personalInfo.email}?subject=Job Opportunity`} className={`px-10 py-5 bg-transparent border ${t.borderColor} rounded-2xl ${t.mutedTextColor} hover:border-${c}-500 hover:${t.textColor} hover:scale-105 transition-all duration-500 font-black uppercase tracking-[0.2em] flex items-center gap-3`}>
                                <Mail size={22} /> Direct Link
                            </a>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
};

export default HireMeSection;
