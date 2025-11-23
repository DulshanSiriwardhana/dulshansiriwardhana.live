import SectionTitle from "../components/SectionTitle";
import { contactLinks, personalInfo } from "../constants/landingPageData";

interface ContactButtonProps {
  label: string;
  url: string;
  type: "email" | "external";
}

const ContactButton = ({ label, url, type }: ContactButtonProps) => {
  const commonClasses =
    "px-8 py-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 text-center w-full md:w-auto";

  if (type === "external") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
      >
        {label}
      </a>
    );
  }

  return (
    <a href={url} className={commonClasses}>
      {label}
    </a>
  );
};

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-20 relative z-10"
    >
      <div className="max-w-4xl w-full space-y-12">
        <SectionTitle
          title="Get In Touch"
          subtitle="I'm always open to discussing new projects and opportunities"
        />

        <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 md:p-12">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <p className="text-xl text-gray-300">
                Feel free to reach out if you'd like to collaborate or just say
                hello!
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
              {contactLinks.map((link, index) => (
                <ContactButton
                  key={index}
                  label={link.label}
                  url={link.url}
                  type={link.type}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-12">
          <p>
            © {new Date().getFullYear()} {personalInfo.firstName}{" "}
            {personalInfo.lastName}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

