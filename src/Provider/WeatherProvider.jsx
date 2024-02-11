import { WeatherContext } from "../contexts";
import { useWeather } from "../hooks";

export default function WeatherProvider({ children }) {
  const { weatherData, loading, error } = useWeather();
  return (
    <WeatherContext.Provider value={{ weatherData, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
}
