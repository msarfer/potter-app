import { SpellInterface } from "@/entities/potterApi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { updateSpellsFavs } from "@/store/features/spellsSlice";
import { useCallback, useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { AuthContext } from "@/providers/AuthProvider";

interface SpellProps {
  spell: SpellInterface;
}

export const Spell = ({ spell }: SpellProps) => {
  const { favs } = useAppSelector((state) => state.spells);
  const { user } = useContext(AuthContext);

  const dispatch = useAppDispatch();
  const handleToggleFav = useCallback(() => {
    const newFavs = favs.includes(spell.index)
      ? favs.filter((fav) => fav !== spell.index)
      : [...favs, spell.index];

    dispatch(updateSpellsFavs({ userId: user.uid, favs: newFavs }));
  }, [favs]);

  return (
    <Card className="p-0 m-0 flex flex-row overflow-hidden w-1/4">
      <CardHeader className="w-full p-4">
        <CardTitle>
          <h3 className="text-accent-foreground">{spell.spell}</h3>
        </CardTitle>
        <CardContent className="text-balance p-0 h-full flex flex-col justify-between gap-3">
          <CardDescription className="text-sm text-muted-foreground">
            {spell.use}
          </CardDescription>
          <Button
            variant="outline"
            className="cursor-pointer mt-2"
            onClick={handleToggleFav}
          >
            <Heart
              fill={`${favs.includes(spell.index) ? "currentColor" : "none"}`}
            />
          </Button>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
