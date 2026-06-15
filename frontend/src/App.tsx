import "./App.css";
import { useEffect, useRef, useState } from "react";
import { ConstructionAreaPopupProvider } from "./context/ConstructionPopupContext";
import UnderDevelopment from "./pages/UnderDevelopment";
import hammerSound from "./assets/musics/hammer.mp3";
import HomePage from "./pages/HomePage";
import { TypingSoundProvider } from "./context/TypingSoundEffect";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const environment = import.meta.env.VITE_ENVIRONMENT;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log("Autoplay blocked. Waiting for interaction."));
    }
  };

  useEffect(() => {
    handlePlay();
  }, []);

  return (
    <BrowserRouter>
      <div
        className="w-full min-h-screen bg-black text-white font-spectral relative"
        onClick={!isPlaying ? handlePlay : undefined}
      >
        <TypingSoundProvider>
          <ConstructionAreaPopupProvider>
            {environment === "development" ? (
              <>
                <UnderDevelopment />
                <audio ref={audioRef} src={hammerSound} loop />
              </>
            ) : (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product" element={<UnderDevelopment />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}
          </ConstructionAreaPopupProvider>
        </TypingSoundProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
