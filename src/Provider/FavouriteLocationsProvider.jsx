import { FavouriteLocationsContext } from "../contexts";
import { useLocalStorage } from "../hooks";

export default function FavouriteLocationsProvider({ children }) {
  const [favouriteLocations, setFavouriteLocations] = useLocalStorage(
    "favoriteLocations",
    []
  );

  const addToFavourite = (location, latitude, longitude) => {
    setFavouriteLocations([
      ...favouriteLocations,
      { location, latitude, longitude },
    ]);
  };

  const removeFromFavourite = (location) => {
    setFavouriteLocations(
      favouriteLocations.filter((fav) => fav.location !== location)
    );
  };

  return (
    <FavouriteLocationsContext.Provider
      value={{ favouriteLocations, addToFavourite, removeFromFavourite }}
    >
      {children}
    </FavouriteLocationsContext.Provider>
  );
}
