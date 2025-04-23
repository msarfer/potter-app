import { ColorHouses, HouseInterface } from "@/entities/potterApi";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";

interface HouseProps {
  house: HouseInterface;
}

export const House = ({ house }: HouseProps) => {
  const { colors, house: name, animal, founder } = house;
  const { color, backgroundColor } = useMemo(
    () => ColorHouses[name] || { color: "#000", backgroundColor: "#FFF" },
    [name]
  );

  return (
    <div
      className={`flex flex-col items-center justify-center border rounded-lg shadow-lg p-6 ${backgroundColor}`}
      style={{ borderColor: color, backgroundColor }}
    >
      <span className="text-4xl">{house.emoji}</span>
      <h3 className="text-2xl font-bold mt-2 text-black">{name}</h3>
      <p className="text-lg text-gray-700 mt-1">
        <FormattedMessage id="houses.founder" />: {founder}
      </p>
      <p className="text-md text-gray-600 mt-1">
        <FormattedMessage id="houses.animal" />: {animal}
      </p>
      <div className="flex mt-2">
        {colors.map((color, i) => (
          <span
            key={i}
            className="w-6 h-6 rounded-full border border-gray-300 mr-1"
            style={{ backgroundColor: color }}
          ></span>
        ))}
      </div>
    </div>
  );
};
