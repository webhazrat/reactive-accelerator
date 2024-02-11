import { useContext, useState } from "react";
import { getLocationByName } from "../../data/location-data";
import { SelectedLocationContext } from "../../contexts";
import { useDebounce } from "../../hooks";
export default function SearchLocation() {
  const { setSelectedLocation } = useContext(SelectedLocationContext);
  const [term, setTerm] = useState("");

  const debounce = useDebounce((term) => {
    setSelectedLocation(getLocationByName(term));
  }, 1000);

  const handleChange = (e) => {
    const term = e.target.value;
    setTerm(term);

    if (e.target.value !== "") debounce(term);
  };

  return (
    <div className="flex items-center space-x-2 py-2 px-3 group focus-within:bg-black/30 transition-all border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md">
      <input
        className="bg-transparent  placeholder:text-white text-white w-full text-xs md:text-base outline-none border-none"
        type="search"
        placeholder="Search Location"
        value={term}
        onChange={handleChange}
        required
      />
    </div>
  );
}
