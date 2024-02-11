import Header from "./components/header/Header";
import WeatherBoard from "./components/weather/WeatherBoard";
import ClearSkyImage from "./assets/backgrounds/clear-sky.jpg";
import FewCloudsImage from "./assets/backgrounds/few-clouds.jpg";
import MistImage from "./assets/backgrounds/mist.jpeg";
import RainyDayImage from "./assets/backgrounds/rainy-day.jpg";
import ScatterdCloudsImage from "./assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "./assets/backgrounds/sunny.jpg";
import ThunderStormImage from "./assets/backgrounds/thunderstorm.jpg";
import WinterImage from "./assets/backgrounds/winter.jpg";
import { useContext } from "react";
import { WeatherContext } from "./contexts";
export default function Dashboard() {
  const { weatherData } = useContext(WeatherContext);
  const { climate } = weatherData;
  function getBackgroundImage(climate) {
    switch (climate) {
      case "Rain":
        return RainyDayImage;
      case "Clouds":
        return ScatterdCloudsImage;
      case "Clear":
        return ClearSkyImage;
      case "Snow":
        return SnowImage;
      case "Thunder":
        return ThunderStormImage;
      case "Fog":
        return WinterImage;
      case "Haze":
        return FewCloudsImage;
      case "Mist":
        return MistImage;
      default:
        return ClearSkyImage;
    }
  }
  return (
    <div
      style={{ backgroundImage: `url('${getBackgroundImage(climate)}')` }}
      className={`bg-body font-[Roboto] text-light bg-no-repeat bg-cover h-screen grid place-items-center`}
    >
      <Header />
      <main>
        <WeatherBoard />
      </main>
    </div>
  );
}
