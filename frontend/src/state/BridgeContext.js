import { createContext, useContext } from "react";
import { CityContext } from "./CityContext";

const BridgeContext = createContext();

export const BridgeCityProvider = ({ value, children }) => {
    const cityContext = useContext(CityContext);
    return (
        <CityContext.Provider value={cityContext}>{children}</CityContext.Provider>
        );
    };
    
export const useCityContext = () => useContext(BridgeContext);