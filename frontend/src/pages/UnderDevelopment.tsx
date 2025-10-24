import { useEffect, useRef, useState } from "react";
import { useConstructionAreaPopup } from "../context/ConstructionPopupContext";
import blacksmith from "../assets/gifs/blacksmith.gif";
import hammerSound from "../assets/musics/hammer.mp3";

const UnderDevelopment = () => {
  const { showConstructionAreaPopup } = useConstructionAreaPopup();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    showConstructionAreaPopup();
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] text-white text-center"
      onClick={!isPlaying ? handlePlay : undefined}
    >
      <audio ref={audioRef} src={hammerSound} loop />

      <img
        src={blacksmith}
        alt="Viking blacksmith working"
        className="w-60 h-60 object-contain mb-6 animate-pulse"
      />
      <h1 className="text-2xl font-bold text-red-500 mb-2">
        🛠️ Under Development
      </h1>
      <p className="text-gray-300 text-sm max-w-md">
        This website is still being forged. Please check back later!
      </p>

      {!isPlaying && (
        <p className="mt-4 text-sm text-gray-500 animate-pulse">
          🔊 Tap anywhere to start sound
        </p>
      )}
    </div>
  );
};

export default UnderDevelopment;
