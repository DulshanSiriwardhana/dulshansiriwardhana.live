import { useState, useEffect } from "react";
import { navigationLinks } from "../constants/landingPageData";
import { Menu, X, Terminal } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      const currentPath = location.pathname.substring(1);
      setActiveSection(currentPath);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navigationLinks.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen
        ? "bg-black/90 backdrop-blur-xl border-b border-green-500/30 shadow-2xl shadow-green-500/10"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#hero"
            onClick={(e) => handleNavigation(e, "#hero")}
            className="group flex items-center gap-3 text-2xl font-bold transition-all duration-300"
          >
            <div className="w-10 h-10 border-2 border-green-500/50 rounded-xl flex items-center justify-center bg-green-500/10 group-hover:bg-green-500 group-hover:border-green-400 group-hover:rotate-[360deg] transition-all duration-700">
              <Terminal size={22} className="text-green-400 group-hover:text-black transition-colors" />
            </div>
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300 tracking-tighter uppercase font-black">
              Dulshan S.
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navigationLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={`group relative px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${isActive
                    ? "text-green-400"
                    : "text-gray-500 hover:text-green-400"
                    }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{link.label}</span>

                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] rounded-full"></span>
                  )}

                  {!isActive && (
                    <span className="absolute bottom-0 left-1/2 right-1/2 h-[2px] bg-green-500/0 group-hover:left-4 group-hover:right-4 group-hover:bg-green-500/50 transition-all duration-300 rounded-full"></span>
                  )}
                </a>
              );
            })}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-300 hover:text-green-400 transition-all duration-300 group"
            aria-label="Toggle menu"
          >
            <div className="p-2 border border-white/10 rounded-lg group-hover:border-green-500/50 transition-all">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>

        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen
            ? "max-h-[80vh] opacity-100 py-6 overflow-y-auto bg-black/80 backdrop-blur-2xl rounded-b-3xl border-b border-green-500/20 px-4"
            : "max-h-0 opacity-0 py-0 overflow-hidden"
            }`}
        >
          <div className="space-y-2 border-t border-white/5 pt-6">
            {navigationLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={`group block px-6 py-4 text-xs font-bold uppercase tracking-[0.3em] transition-all duration-300 rounded-2xl relative overflow-hidden ${isActive
                    ? "text-green-400 bg-green-500/10 border-l-4 border-green-500 shadow-xl shadow-green-500/10"
                    : "text-gray-500 hover:text-green-400 hover:bg-white/5"
                    }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.label}</span>
                    {isActive ? (
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]"></div>
                    ) : (
                      <Terminal size={14} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
