import { useMemo } from "react";
import { useCity } from "../state/CityContext";

const cityInfo = [
  {
    name: "Bergen",
    description: "En flott tur til Bergen",
  },
  {
    name: "Cityname",
    description:
      "This is the wonderful place of city. I visited this city multiple times, and never seem to get enough",
  },
];

export const City = (props) => {
  const { city, resetCity } = useCity();

  const cityDesc = useMemo(() => cityInfo.find((x) => x.name === city), [city]);
  if (city === null) return null;
  return (
    <div className="city-wrapper">
      <button onClick={() => resetCity()}>close</button>
      <h1>{cityDesc?.name}</h1>
      <p>{cityDesc?.description}</p>
    </div>
  );
};
