import ErrorAlert from "@/components/ErrorAlert";
import { Spell } from "@/components/Spell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { AuthContext } from "@/providers/AuthProvider";
import { LanguageContext } from "@/providers/LanguageProvider";
import { fetchSpells, fetchSpellsFavs } from "@/store/features/spellsSlice";
import { useContext, useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";

export default function SpellsPage() {
  const {
    items: spells,
    favs,
    error,
  } = useAppSelector((state) => state.spells);
  const { locale } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(fetchSpells(locale));
    dispatch(fetchSpellsFavs(user.uid));
  }, [locale]);

  const favsSpells = useMemo(
    () => spells.filter((spell) => favs.includes(spell.index)),
    [spells, favs]
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
        <section className="flex flex-wrap justify-center w-full h-full gap-x-12 gap-y-4">
          {spells &&
            spells.map((spell) => <Spell key={spell.index} spell={spell} />)}
        </section>
      </TabsContent>
      <TabsContent value="favs" className="mt-5">
        <section className="flex flex-wrap justify-center w-full h-full gap-x-12 gap-y-4">
          {favsSpells &&
            favsSpells.map((spell) => (
              <Spell key={spell.index} spell={spell} />
            ))}
        </section>
      </TabsContent>
    </Tabs>
  );
}
