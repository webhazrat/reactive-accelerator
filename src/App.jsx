import WeatherProvider from "./Provider/WeatherProvider";
import FavouriteLocationsProvider from "./Provider/FavouriteLocationsProvider";
import SelectedLocationProvider from "./Provider/SelectedLocationProvider";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <SelectedLocationProvider>
      <WeatherProvider>
        <FavouriteLocationsProvider>
          <Dashboard />
        </FavouriteLocationsProvider>
      </WeatherProvider>
    </SelectedLocationProvider>
  );
}
