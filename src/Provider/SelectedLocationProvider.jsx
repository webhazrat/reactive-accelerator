import { useState } from "react";
import { SelectedLocationContext } from "../contexts";

export default function SelectedLocationProvider({ children }) {
  const [selectedLocation, setSelectedLocation] = useState({
    location: "",
    latitude: 0,
    longitude: 0,
  });
  return (
    <SelectedLocationContext.Provider
      value={{ selectedLocation, setSelectedLocation }}
    >
      {children}
    </SelectedLocationContext.Provider>
  );
}
