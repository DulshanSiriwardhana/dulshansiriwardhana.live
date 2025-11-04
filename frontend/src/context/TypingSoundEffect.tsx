import React, { createContext, useContext, useRef, useCallback } from "react";
import typingSound from "../assets/sounds/typing.mp3";

interface TypingSoundOptions {
  delay?: number;
  loop?: boolean;
  volume?: number;
}

interface TypingSoundContextType {
  playSound: (options?: TypingSoundOptions) => void;
  stopSound: () => void;
}

const TypingSoundContext = createContext<TypingSoundContextType | undefined>(undefined);

export const TypingSoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((options?: TypingSoundOptions) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(typingSound);
    audio.loop = options?.loop ?? false;
    audio.volume = options?.volume ?? 1.0;
    audioRef.current = audio;

    if (options?.delay && options.delay > 0) {
      setTimeout(() => {
        audio.play().catch((err) => console.warn("Audio play failed:", err));
      }, options.delay);
    } else {
      audio.play().catch((err) => console.warn("Audio play failed:", err));
    }
  }, []);

  const stopSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return (
    <TypingSoundContext.Provider value={{ playSound, stopSound }}>
      {children}
    </TypingSoundContext.Provider>
  );
};

export const useTypingSound = (): TypingSoundContextType => {
  const context = useContext(TypingSoundContext);
  if (!context) {
    throw new Error("useTypingSound must be used within a TypingSoundProvider");
  }
  return context;
};
