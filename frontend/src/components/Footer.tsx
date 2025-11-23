import { personalInfo, contactLinks } from "../constants/landingPageData";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-green-500/10 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-400">
              {personalInfo.firstName} {personalInfo.lastName}
            </h3>
            <p className="text-gray-400 text-sm">
              {personalInfo.title}
            </p>
            <p className="text-gray-500 text-sm">
              {personalInfo.location}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target={link.type === "external" ? "_blank" : undefined}
                  rel={link.type === "external" ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 flex items-center justify-center bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300"
                  aria-label={link.label}
                >
                  {link.icon || link.label.charAt(0)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-green-500/10 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {personalInfo.firstName} {personalInfo.lastName}. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

