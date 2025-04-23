import ErrorAlert from "@/components/ErrorAlert";
import { Spell } from "@/components/Spell";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { AuthContext } from "@/providers/AuthProvider";
import { LanguageContext } from "@/providers/LanguageProvider";
import { fetchSpells, fetchSpellsFavs } from "@/store/features/spellsSlice";
import { useContext, useEffect } from "react";

export default function SpellsPage() {
  const { items: spells, error } = useAppSelector((state) => state.spells);
  const { locale } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(fetchSpells(locale));
    dispatch(fetchSpellsFavs(user.uid));
  }, [locale]);

  if (error) return <ErrorAlert message={error}></ErrorAlert>;
  return (
    <section className="flex flex-wrap justify-center w-full h-full gap-x-12 gap-y-4">
      {spells &&
        spells.map((spell) => <Spell key={spell.index} spell={spell} />)}
    </section>
  );
}
