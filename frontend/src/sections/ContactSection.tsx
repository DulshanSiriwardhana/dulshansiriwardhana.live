import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import ContactForm from "../components/ContactForm";
import { contactLinks, personalInfo } from "../constants/landingPageData";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-16 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-6xl w-full space-y-8 md:space-y-10">
        <SectionTitle
          title="Get In Touch"
          subtitle="I'm always open to discussing new projects and opportunities"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <ScrollAnimation direction="right" className="h-full">
            <div className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-5 md:p-6 lg:p-8 h-full flex flex-col hover:border-green-500/40 hover:bg-[#1a1a1a]/60 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                  Send me a message
                </h3>
              </div>
              <div className="flex-1">
                <ContactForm />
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="left" className="h-full">
            <div className="space-y-4 md:space-y-5 h-full flex flex-col">
              <div className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-5 md:p-6 lg:p-8 flex-grow hover:border-green-500/40 hover:bg-[#1a1a1a]/60 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <span className="text-xl">🤝</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                    Let's Connect
                  </h3>
                </div>
                <p className="text-gray-300 mb-5 md:mb-6 leading-relaxed text-sm md:text-base">
                  Feel free to reach out if you'd like to collaborate, discuss
                  a project, or just say hello! I'm always interested in
                  connecting with fellow developers and exploring new
                  opportunities.
                </p>

                <div className="space-y-3 md:space-y-4">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="group/contact flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#1a1a1a]/30 border border-green-500/10 rounded-xl hover:bg-green-500/10 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400 group-hover/contact:scale-110 group-hover/contact:rotate-3 transition-transform duration-300 flex-shrink-0">
                      <span className="text-lg md:text-xl">✉️</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-xs md:text-sm font-medium mb-0.5 md:mb-1">Email</p>
                      <p className="text-green-400 text-sm md:text-base group-hover/contact:text-green-300 transition-colors duration-300 break-all">
                        {personalInfo.email}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300">
                      <span className="text-green-400">→</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#1a1a1a]/30 border border-green-500/10 rounded-xl">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400 flex-shrink-0">
                      <span className="text-lg md:text-xl">📍</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs md:text-sm font-medium mb-0.5 md:mb-1">Location</p>
                      <p className="text-white text-sm md:text-base">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-5 md:p-6 lg:p-8 hover:border-green-500/40 hover:bg-[#1a1a1a]/60 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <span className="text-xl">🌐</span>
                  </div>
                  <h4 className="text-base md:text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                    Follow Me
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {contactLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target={link.type === "external" ? "_blank" : undefined}
                      rel={
                        link.type === "external"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group/link flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 hover:border-green-500/60 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                    >
                      <span className="text-lg md:text-xl group-hover/link:scale-125 group-hover/link:rotate-12 transition-transform duration-300">{link.icon}</span>
                      <span className="text-xs md:text-sm font-medium flex-1 truncate">{link.label}</span>
                      <span className="opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all duration-300 text-green-400 text-sm">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

