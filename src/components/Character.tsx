import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterInterface, ColorHouses } from "@/entities/potterApi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { AuthContext } from "@/providers/AuthProvider";
import { updateCharactersFavs } from "@/store/features/charactersSlice";
import { Heart } from "lucide-react";
import { useCallback, useContext, useMemo } from "react";
import { FormattedMessage } from "react-intl";

interface CharacterProps {
  character: CharacterInterface;
}

export const Character = ({ character }: CharacterProps) => {
  const { favs } = useAppSelector((state) => state.characters);
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const handleToggleFav = useCallback(() => {
    const newFavs = favs.includes(character.index)
      ? favs.filter((fav) => fav !== character.index)
      : [...favs, character.index];

    dispatch(updateCharactersFavs({ userId: user.uid, favs: newFavs }));
  }, [favs]);

  const { color, backgroundColor } = useMemo(
    () =>
      ColorHouses[character.hogwartsHouse] || {
        color: "#000",
        backgroundColor: "#FFF",
      },
    [character.hogwartsHouse]
  );

  return (
    <Card className="p-0 m-0 flex flex-row overflow-hidden w-1/4">
      <img
        src={character.image}
        alt={character.fullName}
        className="h-full w-1/2 object-fit rounded-tl-lg"
      />
      <CardHeader className="w-1/2 p-4 h-full">
        <CardTitle>
          <h3 className="text-accent-foreground text-xl">
            {character.fullName}
          </h3>
        </CardTitle>
        <CardContent className="text-balance p-0 h-full flex flex-col justify-between">
          <header>
            <h5 className="flex flex-col">
              <FormattedMessage id="character.birth" />
              <span className="font-bold">{character.birthdate}</span>
            </h5>
            <h5 className="flex flex-col">
              <FormattedMessage id="character.house" />
              <Badge
                variant="outline"
                className="font-bold mt-1"
                style={{ color, backgroundColor }}
              >
                {character.hogwartsHouse}
              </Badge>
            </h5>
          </header>
          <Button
            variant="outline"
            className="cursor-pointer mt-2"
            onClick={handleToggleFav}
          >
            <Heart
              fill={`${
                favs.includes(character.index) ? "currentColor" : "none"
              }`}
            />
          </Button>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
