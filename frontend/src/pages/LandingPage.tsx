import Background from "../components/Background";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import ExperienceSection from "../sections/ExperienceSection";
import StatsSection from "../sections/StatsSection";
import ProjectsSection from "../sections/ProjectsSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import ContactSection from "../sections/ContactSection";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white font-spectral relative overflow-x-hidden">
      <Background />
      <NavigationBar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <StatsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;