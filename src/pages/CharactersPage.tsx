import ErrorAlert from "@/components/ErrorAlert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ColorHouses, type CharacterInterface } from "@/entities/potterApi"
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk"
import { AuthContext } from "@/providers/AuthProvider"
import { LanguageContext } from "@/providers/LanguageProvider"
import { fetchCharacters, fetchCharactersFavs, updateCharactersFavs } from "@/store/features/charactersSlice"
import { Heart } from "lucide-react"
import { useCallback, useContext, useEffect, useMemo } from "react"

export default function CharactersPage() {
  const { items: characters, error } = useAppSelector(state => state.characters)
  const { locale } = useContext(LanguageContext)
  const { user } = useContext(AuthContext)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (!user) return
    dispatch(fetchCharacters(locale))
    dispatch(fetchCharactersFavs(user.uid))
  }, [locale])

  if (error) return <ErrorAlert message={error}></ErrorAlert>
  return (
    <section className="flex flex-wrap justify-center w-full h-full gap-x-12 gap-y-4">
      {
        characters && characters.map((character) => <Character key={character.index} character={character}/>)
      }
    </section>
  )
}

interface CharacterProps {
  character: CharacterInterface
}

export const Character = ({ character }: CharacterProps) => {
  const { favs } = useAppSelector(state => state.characters)
  const { user } = useContext(AuthContext)
  const dispatch = useAppDispatch()
  const handleToggleFav = useCallback(() => {
    const newFavs = favs.includes(character.index)
    ? favs.filter((fav) => fav !== character.index)
    : [...favs, character.index]

    dispatch(updateCharactersFavs({userId: user.uid, favs: newFavs}))
  }, [favs])

  const { color, backgroundColor } = useMemo(() => ColorHouses[character.hogwartsHouse] || { color: "#000", backgroundColor: "#FFF" }, [character.hogwartsHouse])

  return (
    <Card className="p-0 m-0 flex flex-row overflow-hidden w-1/3 bg-[]">
      <img
        src={character.image}
        alt={character.fullName}
        className="h-full w-1/2 object-fit rounded-tl-lg"
      />
      <CardHeader className="w-1/2 p-4">
        <CardTitle>
          <h3 className="text-accent-foreground">{character.fullName}</h3>
        </CardTitle>
        <CardContent className="text-balance p-0 h-full">
          <div className="h-1/4 pt-2">
            <h5>Nacimiento: <span>{character.birthdate}</span></h5>
            <h5>Casa: <Badge variant='outline' style={{color, backgroundColor}}>{character.hogwartsHouse}</Badge></h5>
            <Button variant='outline' className="cursor-pointer" onClick={handleToggleFav}>
              <Heart fill={`${favs.includes(character.index) ? 'currentColor': 'none'}`}/>
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
