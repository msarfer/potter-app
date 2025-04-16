import ErrorAlert from "@/components/ErrorAlert"
import { House } from "@/components/House"
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk"
import { AuthContext } from "@/providers/AuthProvider"
import { LanguageContext } from "@/providers/LanguageProvider"
import { fetchHouses } from "@/store/features/housesSlice"
import { useContext, useEffect } from "react"

export default function HousesPage() {
  const { items: houses, error } = useAppSelector(state => state.houses)
  const { locale } = useContext(LanguageContext)
  const { user } = useContext(AuthContext)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (!user) return
    dispatch(fetchHouses(locale))
  }, [locale, user, dispatch])

  if (error) return <ErrorAlert message={error}></ErrorAlert>
  
  return (
    <section className="grid grid-cols-2 grid-rows-2 gap-6 w-full h-full p-6">
      {
        houses && houses.map((house, index) => <House key={index} house={house}/>)
      }
    </section>
  )
}