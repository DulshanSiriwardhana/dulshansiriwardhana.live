import { useEffect } from "react";
import { useConstructionAreaPopup } from "../context/ConstructionPopupContext";
import blacksmith from "../assets/gifs/blacksmith.gif";
import ConstructionProgressBar from "../components/ConstructionProgressBar";

const UnderDevelopment = () => {
  const { showConstructionAreaPopup } = useConstructionAreaPopup();

  useEffect(() => {
    showConstructionAreaPopup();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 bg-[#0f0f0f] text-white text-center relative overflow-hidden p-4">
        <div className="z-10 bg-[#1a1a1a]/50 backdrop-blur-sm p-12 rounded-3xl border border-red-600/30 shadow-2xl">
            <img
                src={blacksmith}
                alt="Viking blacksmith working"
                className="w-60 h-60 object-contain mb-6 mx-auto animate-pulse"
            />

            <h1 className="text-4xl font-bold mb-4 inline-flex flex-wrap justify-center gap-1">
                <span className="inline-block text-red-500">U</span>
                <span className="inline-block text-red-500">n</span>
                <span className="inline-block text-red-500 animate-tilt">d</span>
                <span className="inline-block text-red-500">e</span>
                <span className="inline-block text-red-500 animate-hang">r</span>
                <span className="inline-block mx-2"></span>
                <span className="inline-block text-yellow-400">D</span>
                <span className="inline-block text-yellow-400">e</span>
                <span className="inline-block text-yellow-400 animate-wobble">v</span>
                <span className="inline-block text-yellow-400">e</span>
                <span className="inline-block text-yellow-400">l</span>
                <span className="inline-block text-yellow-400 animate-tilt-reverse">o</span>
                <span className="inline-block text-yellow-400">p</span>
                <span className="inline-block text-yellow-400">m</span>
                <span className="inline-block text-yellow-400">e</span>
                <span className="inline-block text-yellow-400">n</span>
                <span className="inline-block text-yellow-400">t</span>
            </h1>

            <div className="flex justify-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            </div>

            <p className="text-gray-300 text-lg max-w-md">
                This website is still being forged. Please check back later!
            </p>

            <div className="mt-6 flex justify-center gap-3">
                <div className="px-4 py-2 bg-yellow-400/20 border border-yellow-400 rounded-full text-yellow-400 text-sm">
                Coming Soon
                </div>
            </div>
        </div>
        <ConstructionProgressBar/>
    </div>
  );
};

export default UnderDevelopment;