import { useContext } from "react";
import {
  FavouriteLocationsContext,
  SelectedLocationContext,
} from "../../contexts";

export default function FavouriteLocationsModal() {
  const { favouriteLocations } = useContext(FavouriteLocationsContext);
  const { setSelectedLocation } = useContext(SelectedLocationContext);
  const handleLocation = (favourite) => {
    setSelectedLocation(favourite);
  };
  return (
    <div className="max-w-xs py-4 bg-white rounded-md border-gray-500 absolute right-0 top-16 text-black shadow-lg ">
      <h3 className="text-lg font-bold px-4">Favourite Locations</h3>
      <ul className="space-y-2 mt-4 *:py-2 *:px-4 *:cursor-pointer">
        {favouriteLocations.length > 0 ? (
          favouriteLocations.map((favourite) => (
            <li
              key={favourite.location}
              className="hover:bg-gray-200"
              onClick={() => handleLocation(favourite)}
            >
              {favourite.location}
            </li>
          ))
        ) : (
          <li className="hover:bg-gray-200">Noting found</li>
        )}
      </ul>
    </div>
  );
}
