import { useContext } from "react";
import AddFavourite from "./AddFavourite";
import WeatherCondition from "./WeatherCondition";
import WeatherHeader from "./WeatherHeader";
import { WeatherContext } from "../../contexts";

export default function WeatherBoard() {
  const { loading } = useContext(WeatherContext);
  return (
    <>
      {loading.state ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <p className="text-2xl bg-slate-100 py-4 px-6">{loading.message}</p>
        </div>
      ) : (
        <div className="container">
          <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-2 lg:border-[3px] border-white/[14%] px-4 lg:px-14 py-6 lg:py-10 min-h-[520px] max-w-[1058px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 md:gap-6 text-white">
              <AddFavourite />
              <WeatherHeader />
              <WeatherCondition />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
