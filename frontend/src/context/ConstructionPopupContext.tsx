import React, { createContext, useContext, useState, type ReactNode } from "react";
import ConstructionAreaPopup from "../components/ContructionAreaPopup";
interface ConstructionAreaPopupContextProps {
  showConstructionAreaPopup: () => void;
  hideConstructionAreaPopup: () => void;
}

const ConstructionAreaPopupContext = createContext<ConstructionAreaPopupContextProps>({
  showConstructionAreaPopup: () => {},
  hideConstructionAreaPopup: () => {},
});

export const useConstructionAreaPopup = () => useContext(ConstructionAreaPopupContext);

interface ConstructionAreaPopupProviderProps {
  children: ReactNode;
}

export const ConstructionAreaPopupProvider: React.FC<ConstructionAreaPopupProviderProps> = ({ children }) => {
  const [show, setShowing] = useState(false);

  const showConstructionAreaPopup = () => setShowing(true);
  const hideConstructionAreaPopup = () => setShowing(false);

  return (
    <ConstructionAreaPopupContext.Provider value={{ showConstructionAreaPopup, hideConstructionAreaPopup }}>
      {children}
      {show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <ConstructionAreaPopup/>
        </div>
      )}
    </ConstructionAreaPopupContext.Provider>
  );
};
