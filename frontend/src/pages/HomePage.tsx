import { useState } from "react";
import Terminal from "../components/Terminal";
import LandingPage from "./LandingPage";
import Background from "../components/Background";

const HomePage = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTerminalComplete = () => {
    setIsTransitioning(true);
    // Add a small delay for smooth transition
    setTimeout(() => {
      setIsTerminalOpen(false);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white font-spectral relative overflow-hidden">
      <Background />
      
      {isTerminalOpen ? (
        <div
          className={`min-h-screen flex items-center justify-center p-4 relative z-10 transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <Terminal onComplete={handleTerminalComplete} />
        </div>
      ) : (
        <div
          className={`transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <LandingPage />
        </div>
      )}
    </div>
  );
};

export default HomePage;
