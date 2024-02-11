import { useContext, useEffect, useState } from "react";
import HeartImage from "../../assets/heart.svg";
import HeartRedImage from "../../assets/heart-red.svg";
import { FavouriteLocationsContext, WeatherContext } from "../../contexts";
export default function AddFavourite() {
  const { favouriteLocations, addToFavourite, removeFromFavourite } =
    useContext(FavouriteLocationsContext);
  const { weatherData } = useContext(WeatherContext);
  const { location, latitude, longitude } = weatherData;
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(favouriteLocations.find((fav) => fav.location === location));
  }, [favouriteLocations, location]);

  const handleFavourite = () => {
    if (isFavourite) {
      removeFromFavourite(location);
    } else {
      addToFavourite(location, latitude, longitude);
    }
    setIsFavourite((prev) => !prev);
  };

  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-end space-x-6">
        <button
          className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
          onClick={handleFavourite}
        >
          <span>Add to Favourite</span>
          <img src={isFavourite ? HeartRedImage : HeartImage} alt="heart" />
        </button>
      </div>
    </div>
  );
}
