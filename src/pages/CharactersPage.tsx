import { Character } from "@/components/Character";
import ErrorAlert from "@/components/ErrorAlert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { AuthContext } from "@/providers/AuthProvider";
import { LanguageContext } from "@/providers/LanguageProvider";
import {
  fetchCharacters,
  fetchCharactersFavs,
} from "@/store/features/charactersSlice";
import { useContext, useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";

export default function CharactersPage() {
  const {
    items: characters,
    favs,
    error,
  } = useAppSelector((state) => state.characters);
  const { locale } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(fetchCharacters(locale));
    dispatch(fetchCharactersFavs(user.uid));
  }, [locale]);

  const favsChars = useMemo(
    () => characters.filter((book) => favs.includes(book.index)),
    [characters, favs]
  );

  if (error) return <ErrorAlert message={error}></ErrorAlert>;
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="all">
          <FormattedMessage id="tabs.all" />
        </TabsTrigger>
        <TabsTrigger value="favs">
          <FormattedMessage id="tabs.favs" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-5">
        <section className="flex flex-wrap justify-center w-full h-full gap-x-8 gap-y-4">
          {characters &&
            characters.map((character) => (
              <Character key={character.index} character={character} />
            ))}
        </section>
      </TabsContent>
      <TabsContent value="favs" className="mt-5">
        <section className="flex flex-wrap justify-center w-full h-full gap-x-8 gap-y-4">
          {favsChars &&
            favsChars.map((character) => (
              <Character key={character.index} character={character} />
            ))}
        </section>
      </TabsContent>
    </Tabs>
  );
}
