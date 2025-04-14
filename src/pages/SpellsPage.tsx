import ErrorAlert from "@/components/ErrorAlert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SpellInterface } from "@/entities/potterApi"
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk"
import { AuthContext } from "@/providers/AuthProvider"
import { LanguageContext } from "@/providers/LanguageProvider"
import { fetchSpells, fetchSpellsFavs, updateSpellsFavs } from "@/store/features/spellsSlice"
import { Heart } from "lucide-react"
import { useCallback, useContext, useEffect } from "react"

export default function SpellsPage() {
  const { items: spells, error } = useAppSelector(state => state.spells)
  const { locale } = useContext(LanguageContext)
  const { user } = useContext(AuthContext)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (!user) return
    dispatch(fetchSpells(locale))
    dispatch(fetchSpellsFavs(user.uid))
  }, [locale])

  if (error) return <ErrorAlert message={error}></ErrorAlert>
  return (
    <section className="flex flex-wrap justify-center w-full h-full gap-x-12 gap-y-4">
      {
        spells && spells.map((spell) => <Spell key={spell.index} spell={spell}/>)
      }
    </section>
  )
}

interface SpellProps {
  spell: SpellInterface
}

export const Spell = ({ spell }: SpellProps) => {
  const { favs } = useAppSelector(state => state.spells)
  const { user } = useContext(AuthContext)

  const dispatch = useAppDispatch()
  const handleToggleFav = useCallback(() => {
    const newFavs = favs.includes(spell.index)
    ? favs.filter((fav) => fav !== spell.index)
    : [...favs, spell.index]

    dispatch(updateSpellsFavs({userId: user.uid, favs: newFavs}))
  }, [favs])

  return (
    <Card className="p-0 m-0 flex flex-row overflow-hidden w-1/3">
      <CardHeader className="w-1/2 p-4">
        <CardTitle>
          <h3 className="text-accent-foreground">{spell.spell}</h3>
        </CardTitle>
        <CardContent className="text-balance p-0 h-full">
          <CardDescription className="text-sm text-muted-foreground flex flex-col gap-2">
            {spell.use}
            <Button className="cursor-pointer size-10" onClick={handleToggleFav}>
              <Heart fill={`${favs.includes(spell.index) ? 'currentColor': 'none'}`}/>
            </Button>
          </CardDescription>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
