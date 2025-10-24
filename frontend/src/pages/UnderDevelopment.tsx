import { useEffect } from "react";
import { useConstructionAreaPopup } from "../context/ConstructionPopupContext";
import blacksmith from "../assets/gifs/blacksmith.gif";

const UnderDevelopment = () => {
  const { showConstructionAreaPopup } = useConstructionAreaPopup();

  useEffect(() => {
    showConstructionAreaPopup();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] text-white text-center">
      <img
        src={blacksmith}
        alt="Viking blacksmith working"
        className="w-60 h-60 object-contain mb-6 animate-pulse"
      />
      <h1 className="text-2xl font-bold text-red-500 mb-2">
        🛠️ Under Development
      </h1>
      <p className="text-gray-300 text-sm max-w-md">
        This webstie is still being forged. Please check back later!
      </p>
    </div>
  );
};

export default UnderDevelopment;
