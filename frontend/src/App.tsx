import "./App.css";
import { useEffect, useRef, useState } from "react";
import { ConstructionAreaPopupProvider } from "./context/ConstructionPopupContext";
import UnderDevelopment from "./pages/UnderDevelopment";
import hammerSound from "./assets/musics/hammer.mp3";

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
    <div
      className="w-full min-h-screen bg-black text-white font-spectral flex items-center justify-center relative"
      onClick={!isPlaying ? handlePlay : undefined}
    >
      {environment === "development" ? (
        <ConstructionAreaPopupProvider>
          <UnderDevelopment />
          <audio ref={audioRef} src={hammerSound} loop />
        </ConstructionAreaPopupProvider>
      ) : (
        <div>Hi</div>
      )}
    </div>
  );
}

export default App;
