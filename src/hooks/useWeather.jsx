import { useContext, useEffect, useState } from "react";
import { SelectedLocationContext } from "../contexts";

export default function useWeather() {
  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState({
    temperature: "",
    location: "",
    time: "",
    climate: "",
    maxTemperature: "",
    minTemperature: "",
    humidity: "",
    cloudy: "",
    wind: "",
    latitude: "",
    longitude: "",
  });

  const { selectedLocation } = useContext(SelectedLocationContext);

  const fetchWeather = async (latitude, longitude) => {
    try {
      setLoading({
        ...loading,
        state: true,
        message: "Fetching weather data...",
      });
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Fetching weather data failed: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData({
        ...weatherData,
        temperature: data?.main?.temp,
        location: data?.name,
        time: data?.dt,
        climate: data?.weather[0]?.main,
        maxTemperature: data?.main?.temp_max,
        minTemperature: data?.main?.temp_min,
        humidity: data?.main?.humidity,
        cloudy: data?.clouds?.all,
        wind: data?.wind?.speed,
        latitude: latitude,
        longitude: longitude,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading({
        ...loading,
        state: false,
        message: "",
      });
    }
  };

  useEffect(() => {
    console.log("REQUEST TO API");
    if (selectedLocation.latitude && selectedLocation.longitude) {
      fetchWeather(selectedLocation.latitude, selectedLocation.longitude);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [selectedLocation.latitude, selectedLocation.longitude]);

  return {
    weatherData,
    loading,
    error,
  };
}
