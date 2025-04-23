import { Character } from "@/components/Character";
import ErrorAlert from "@/components/ErrorAlert";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { AuthContext } from "@/providers/AuthProvider";
import { LanguageContext } from "@/providers/LanguageProvider";
import {
  fetchCharacters,
  fetchCharactersFavs,
} from "@/store/features/charactersSlice";
import { useContext, useEffect } from "react";

export default function CharactersPage() {
  const { items: characters, error } = useAppSelector(
    (state) => state.characters
  );
  const { locale } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(fetchCharacters(locale));
    dispatch(fetchCharactersFavs(user.uid));
  }, [locale]);

  if (error) return <ErrorAlert message={error}></ErrorAlert>;
  return (
    <section className="flex flex-wrap justify-center w-full h-full gap-x-12 gap-y-4">
      {characters &&
        characters.map((character) => (
          <Character key={character.index} character={character} />
        ))}
    </section>
  );
}
