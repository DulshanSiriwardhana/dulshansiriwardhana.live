import { useEffect, useState } from "react";

const ConstructionProgressBar = () => {
  const startDate = new Date("2025-10-25T01:00:00");
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const totalDuration = 30 * 24 * 60 * 60 * 1000;
      const percent = Math.min((diff / totalDuration) * 100, 100);
      setProgress(percent);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setElapsed(`${days}d ${hours}h ${minutes}m`);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl px-6 py-6 bg-black/60 backdrop-blur-sm text-center text-white border-t border-b border-red-600/30 overflow-hidden rounded-2xl">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-black to-yellow-400 bg-[length:200%_100%] animate-stripe"></div>
      
      <h2 className="text-xl font-bold mb-2 inline-flex flex-wrap justify-center gap-1">
        <span className="inline-block text-red-500">C</span>
        <span className="inline-block text-red-500 animate-tilt">o</span>
        <span className="inline-block text-red-500">n</span>
        <span className="inline-block text-red-500">s</span>
        <span className="inline-block text-red-500">t</span>
        <span className="inline-block text-red-500 animate-hang">r</span>
        <span className="inline-block text-red-500">u</span>
        <span className="inline-block text-red-500">c</span>
        <span className="inline-block text-red-500">t</span>
        <span className="inline-block text-red-500">i</span>
        <span className="inline-block text-red-500 animate-wobble">o</span>
        <span className="inline-block text-red-500">n</span>
        <span className="inline-block mx-2"></span>
        <span className="inline-block text-yellow-400">P</span>
        <span className="inline-block text-yellow-400 animate-tilt-reverse">r</span>
        <span className="inline-block text-yellow-400">o</span>
        <span className="inline-block text-yellow-400">g</span>
        <span className="inline-block text-yellow-400">r</span>
        <span className="inline-block text-yellow-400">e</span>
        <span className="inline-block text-yellow-400">s</span>
        <span className="inline-block text-yellow-400">s</span>
      </h2>

      <p className="text-sm text-gray-300 mb-4">
        Started on <span className="font-medium text-red-400">Oct 24, 2025 - 1:00 AM</span>
      </p>

      <div className="w-full bg-black/80 rounded-full h-4 overflow-hidden border border-red-600/50 relative">
        <div
          className="bg-gradient-to-r from-yellow-400 to-red-500 h-4 transition-all duration-500 animate-pulse-slow relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-2 items-center">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
      </div>

      <div className="mt-3 text-sm flex justify-center gap-4">
        <span className="text-gray-300">
          Progress: <span className="text-yellow-400 font-bold">{progress.toFixed(1)}%</span>
        </span>
        <span className="text-red-600">|</span>
        <span className="text-gray-300">
          Elapsed: <span className="text-red-400 font-bold">{elapsed}</span>
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-black to-yellow-400 bg-[length:200%_100%] animate-stripe-reverse"></div>
    </div>
  );
};

export default ConstructionProgressBar;