import { ColorHouses, HouseInterface } from "@/entities/potterApi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { AuthContext } from "@/providers/AuthProvider";
import { updateUserHouse } from "@/store/features/houseSlice";
import { useContext, useMemo } from "react";
import { FormattedMessage } from "react-intl";

interface HouseProps {
  house: HouseInterface;
}

export const House = ({ house }: HouseProps) => {
  const { user } = useContext(AuthContext);
  const { colors, house: name, animal, founder } = house;
  const { house: stateHouse } = useAppSelector((state) => state.house);
  const { color, backgroundColor } = useMemo(
    () => ColorHouses[name] || { color: "#000", backgroundColor: "#FFF" },
    [name]
  );
  const dispatch = useAppDispatch();

  const handleClick = (name: string) => {
    const newHouse = stateHouse === name ? "" : name;
    dispatch(updateUserHouse({ userId: user.uid, house: newHouse }));
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border rounded-lg shadow-lg p-6 mr-1 hover:scale-105 cursor-pointer transition-transform duration-150`}
      style={{ borderColor: color, backgroundColor }}
      onClick={() => handleClick(name)}
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
            className={`w-6 h-6 rounded-full border-gray-300`}
            style={{ backgroundColor: color }}
          ></span>
        ))}
      </div>
    </div>
  );
};
