import { useConstructionAreaPopup } from "../context/ConstructionPopupContext";
import { useEffect, useState } from "react";

const ConstructionAreaPopup = () => {
  const { hideConstructionAreaPopup } = useConstructionAreaPopup();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div
        className={`bg-[#1a1a1a] text-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center border border-red-600 transform transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4 text-red-500">
          ⚠️ Construction Area Ahead
        </h2>

        <p className="text-gray-300 mb-6 leading-relaxed">
          You are about to enter a construction area.<br />
          Are you sure you want to proceed?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={hideConstructionAreaPopup}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-medium transition-all duration-200 shadow-md"
          >
            Yes, proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConstructionAreaPopup;
