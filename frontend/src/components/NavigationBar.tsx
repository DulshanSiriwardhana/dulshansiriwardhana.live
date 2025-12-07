import { useState, useEffect } from "react";
import { navigationLinks } from "../constants/landingPageData";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-green-500/30 shadow-2xl shadow-green-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Enhanced Logo */}
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, "#hero")}
            className="group relative text-2xl md:text-3xl font-bold text-green-400 hover:text-green-300 transition-all duration-300"
          >
            <span className="relative z-10 inline-block">
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent group-hover:from-green-300 group-hover:via-green-400 group-hover:to-green-500 transition-all duration-300">
                DS
              </span>
            </span>
            <span className="absolute inset-0 bg-green-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
          </a>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
            {navigationLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`group relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-green-400"
                      : "text-gray-300 hover:text-green-400"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10 inline-block group-hover:scale-105 transition-transform duration-300">
                    {link.label}
                  </span>
                  
                  {/* Active indicator with enhanced styling */}
                  {isActive && (
                    <>
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-green-400 shadow-lg shadow-green-400/50 rounded-full"></span>
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full animate-pulse"></span>
                    </>
                  )}
                  
                  {/* Hover underline effect */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400/0 group-hover:bg-green-400/50 scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-center rounded-full"></span>
                  )}
                  
                  {/* Hover glow effect */}
                  <span className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 rounded-lg -z-10 transition-all duration-300"></span>
                </a>
              );
            })}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-300 hover:text-green-400 transition-all duration-300 group"
            aria-label="Toggle menu"
          >
            <span className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 rounded-lg transition-all duration-300"></span>
            <svg
              className={`w-6 h-6 relative z-10 transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Enhanced Mobile Menu with slide animation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 py-4"
              : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="space-y-1 border-t border-green-500/20 pt-4">
            {navigationLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`group block px-4 py-3 text-base font-semibold transition-all duration-300 rounded-lg relative overflow-hidden transform ${
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0 pointer-events-none"
                  } ${
                    isActive
                      ? "text-green-400 bg-gradient-to-r from-green-500/10 to-green-600/5 border-l-4 border-green-400 shadow-lg shadow-green-500/10"
                      : "text-gray-300 hover:text-green-400 hover:bg-green-500/5"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isActive && (
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    )}
                    <span>{link.label}</span>
                    {!isActive && (
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-green-400">
                        →
                      </span>
                    )}
                  </span>
                  
                  {/* Hover background effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:to-green-600/5 transition-all duration-300 -z-10"></span>
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

