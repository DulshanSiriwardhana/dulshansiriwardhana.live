import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import ContactForm from "../components/ContactForm";
import { contactLinks, personalInfo } from "../constants/landingPageData";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-6xl w-full space-y-12">
        <SectionTitle
          title="Get In Touch"
          subtitle="I'm always open to discussing new projects and opportunities"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ScrollAnimation direction="right">
            <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 md:p-8 h-full">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
                Send me a message
              </h3>
              <ContactForm />
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="left">
            <div className="space-y-6 h-full flex flex-col">
              <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 md:p-8 flex-grow">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
                  Let's Connect
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Feel free to reach out if you'd like to collaborate, discuss
                  a project, or just say hello! I'm always interested in
                  connecting with fellow developers and exploring new
                  opportunities.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400">
                      ✉️
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-green-400 hover:text-green-300 transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center text-green-400">
                      📍
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 md:p-8">
                <h4 className="text-base md:text-lg font-semibold text-white mb-4">
                  Follow Me
                </h4>
                <div className="grid grid-cols-2 gap-4">
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
                      className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300"
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="text-sm">{link.label}</span>
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

