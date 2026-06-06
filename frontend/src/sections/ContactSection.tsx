import SectionTitle from "../components/SectionTitle";
import ScrollAnimation from "../components/ScrollAnimation";
import ContactForm from "../components/ContactForm";
import { contactLinks, personalInfo } from "../constants/landingPageData";
import {
  MessageSquare,
  Handshake,
  Mail,
  MapPin,
  Globe,
  ArrowRight,
  Terminal,
  Briefcase,
  Share2,
  PenTool
} from "lucide-react";

const ContactSection = () => {
  const getLinkIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'github': return <Terminal size={18} className="text-white" />;
      case 'linkedin': return <Briefcase size={18} className="text-blue-500" />;
      case 'facebook': return <Share2 size={18} className="text-blue-600" />;
      case 'email': return <Mail size={18} className="text-blue-400" />;
      case 'website': return <Globe size={18} className="text-green-400" />;
      case 'medium': return <PenTool size={18} className="text-orange-400" />;
      default: return null;
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-16 pt-24 md:pt-28 relative z-10"
    >
      <div className="max-w-[1440px] w-full space-y-8 md:space-y-10">
        <SectionTitle
          title="Get In Touch"
          subtitle="I'm always open to discussing new projects and opportunities"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <ScrollAnimation direction="right" className="h-full">
            <div className="group bg-[#111]/90 backdrop-blur-md border border-green-500/20 rounded-3xl p-8 h-full flex flex-col hover:border-green-500/50 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-center text-green-400 group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-500">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                  Secure Communication
                </h3>
              </div>
              <div className="flex-1">
                <ContactForm />
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="left" className="h-full">
            <div className="space-y-6 h-full flex flex-col">
              <div className="group bg-[#111]/90 backdrop-blur-md border border-green-500/20 rounded-3xl p-8 flex-grow hover:border-green-500/50 transition-all duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                    <Handshake size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                    Collaboration Hub
                  </h3>
                </div>
                <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base font-medium italic">
                  "Feel free to reach out if you'd like to collaborate, discuss
                  a project, or just say hello! I'm always interested in
                  connecting with fellow developers and exploring new
                  opportunities."
                </p>

                <div className="space-y-4">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="group/contact flex items-center gap-5 p-5 bg-black/40 border border-green-500/10 rounded-2xl hover:bg-green-500/5 hover:border-green-500/50 transition-all duration-500"
                  >
                    <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center text-green-400 group-hover/contact:scale-110 transition-all duration-500">
                      <Mail size={22} className="text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Direct Email</p>
                      <p className="text-green-400 text-sm md:text-base font-bold break-all">
                        {personalInfo.email}
                      </p>
                    </div>
                    <ArrowRight size={20} className="text-green-500 opacity-0 group-hover/contact:opacity-100 group-hover/contact:translate-x-2 transition-all" />
                  </a>

                  <div className="flex items-center gap-5 p-5 bg-black/40 border border-white/5 rounded-2xl group/loc">
                    <div className="w-12 h-12 bg-red-500/10 border border-white/10 rounded-xl flex items-center justify-center text-red-400 group-hover/loc:scale-110 transition-all duration-500">
                      <MapPin size={22} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Base Location</p>
                      <p className="text-white text-sm md:text-base font-bold">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group bg-[#111]/90 backdrop-blur-md border border-green-500/20 rounded-3xl p-8 hover:border-green-500/50 transition-all duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-500">
                    <Globe size={24} />
                  </div>
                  <h4 className="text-2xl font-bold text-white uppercase tracking-tighter">
                    Follow Network
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {contactLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target={link.type === "external" ? "_blank" : undefined}
                      rel={link.type === "external" ? "noopener noreferrer" : undefined}
                      className="group/link flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-xl text-gray-400 hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-400 transition-all duration-500"
                    >
                      <div className="transition-transform duration-500 group-hover/link:scale-125 group-hover/link:rotate-12">
                        {getLinkIcon(link.label)}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest flex-1 truncate">{link.label}</span>
                      <ArrowRight size={14} className="opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all duration-300" />
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
