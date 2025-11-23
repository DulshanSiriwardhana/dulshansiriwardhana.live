import Background from "../components/Background";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import ProjectsSection from "../sections/ProjectsSection";
import ContactSection from "../sections/ContactSection";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white font-spectral relative overflow-x-hidden">
      <Background />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default LandingPage;