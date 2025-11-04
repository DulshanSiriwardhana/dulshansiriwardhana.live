import React, { createContext, useContext, useRef, useCallback } from "react";
import typingSound from "../assets/musics/typing.mp3";

interface TypingSoundOptions {
  delay?: number;
  loop?: boolean;
  volume?: number;
}

interface TypingSoundContextType {
  playSound: (options?: TypingSoundOptions) => void;
  stopSound: () => void;
  resetSound: () => void;
}

const TypingSoundContext = createContext<TypingSoundContextType | undefined>(undefined);

export const TypingSoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((options?: TypingSoundOptions) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(typingSound);
      audio.loop = options?.loop ?? false;
      audio.volume = options?.volume ?? 1.0;
      audioRef.current = audio;

      const playFn = () => {
        audio.play().catch((err) => console.warn("Playback failed:", err));
      };

      if (options?.delay && options.delay > 0) {
        setTimeout(playFn, options.delay);
      } else {
        playFn();
      }
    } catch (err) {
      console.error("Error playing sound:", err);
    }
  }, []);

  const stopSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const resetSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      console.log("🔄 Typing sound reset.");
    }
  }, []);

  return (
    <TypingSoundContext.Provider value={{ playSound, stopSound, resetSound }}>
      {children}
    </TypingSoundContext.Provider>
  );
};

export const useTypingSound = () => {
  const ctx = useContext(TypingSoundContext);
  if (!ctx) throw new Error("useTypingSound must be used inside TypingSoundProvider");
  return ctx;
};
