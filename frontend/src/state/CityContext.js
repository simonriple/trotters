import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  city: null,
};
export const CityContext = createContext(initialState);


const reducer = (state, action) => {
  switch (action.type) {
    case "setCity": {
        console.log("Setting city: ", action.city);
      return { ...state, city: action.city };
    }
    case "resetCity":
      return { ...state, city: null };
    default:
      throw new Error("action.type not supported");
  }
};

export const CityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <CityContext.Provider value={{ state, dispatch }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
    const {state, dispatch} = useContext(CityContext);
    //return {state, dispatch};
    const setCity = (city) => dispatch({ type: "setCity", city: city }); 
    return {
      city: state.city,
      setCity,
      resetCity: () => dispatch({ type: "resetCity" }),
    };
 };
