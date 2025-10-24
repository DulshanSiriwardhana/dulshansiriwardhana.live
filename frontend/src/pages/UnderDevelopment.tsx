import { useEffect } from "react";
import { useConstructionAreaPopup } from "../context/ConstructionPopupContext";

const UnderDevelopment=()=>{
    const { showConstructionAreaPopup } = useConstructionAreaPopup();

    useEffect(()=>{
        showConstructionAreaPopup();
    },[]);

    return(
        <div className="w-full h-full text-white flex items-center justify-center min-h-screen">
            Under Development
        </div>
    )
}

export default UnderDevelopment;