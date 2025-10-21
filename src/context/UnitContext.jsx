import { createContext, useContext, useState } from "react";

const UnitContext = createContext();

export function UnitProvider({ children }) {
  const [unitSystem, setUnitSystem] = useState("metric"); // "metric" or "imperial"

  const toggleUnits = () => {
    setUnitSystem((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <UnitContext.Provider value={{ unitSystem, toggleUnits }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  return useContext(UnitContext);
}
