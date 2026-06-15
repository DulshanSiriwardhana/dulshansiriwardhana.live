import { useState, useEffect, useRef } from "react";
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

const CVPage = () => {
    const cvRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState('emerald');
    const [cvTemplate, setCvTemplate] = useState('modern');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const themeData = await getCvTheme();
                if (themeData && themeData.value) setTheme(themeData.value);

                const templateData = await getCvTemplate();
                if (templateData && templateData.value) setCvTemplate(templateData.value);
            } catch (error) {
                console.error("Error fetching CV settings:", error);
            } finally {
                setIsLoading(false);
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${t.backgroundColor} p-0 md:p-8 flex justify-center`}>
            <div className="max-w-[1000px] w-full">
                {renderTemplate()}
            </div>
        </div>
    );
};

export default CVPage;
