import ErrorAlert from "@/components/ErrorAlert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { BookInterface } from "@/entities/potterApi"
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk"
import { AuthContext } from "@/providers/AuthProvider"
import { LanguageContext } from "@/providers/LanguageProvider"
import logger from "@/services/logging"
import { fetchBooks, fetchBooksFavs, updateBooksFavs } from "@/store/features/books/booksSlice"
import { Heart } from "lucide-react"
import { useCallback, useContext, useEffect } from "react"

export default function BooksPage() {
  const { books, error } = useAppSelector(state => state.books)
  const { locale } = useContext(LanguageContext)
  const { user } = useContext(AuthContext)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (!user) return
    dispatch(fetchBooks(locale))
    dispatch(fetchBooksFavs(user.uid))
  }, [locale])

  if (error) return <ErrorAlert message={error}></ErrorAlert>
  return (
    <section className="flex flex-wrap justify-center w-full h-full gap-x-12 gap-y-4">
      {
        books.map((book) => <Book key={book.index} book={book}/>)
      }
    </section>
  )
}

interface BookProps {
  book: BookInterface
}

export const Book = ({ book }: BookProps) => {
  const { favs } = useAppSelector(state => state.books)
  const { user } = useContext(AuthContext)
  console.log(user.uid)
  const dispatch = useAppDispatch()
  const handleToggleFav = useCallback(() => {
    const newFavs = favs.includes(book.index)
    ? favs.filter((fav) => fav !== book.index)
    : [...favs, book.index]
    
    dispatch(updateBooksFavs({userId: user.uid, favs: newFavs}))
  }, [favs])

  return (
    <Card className="p-0 m-0 flex flex-row overflow-hidden w-1/3">
      <img
        src={book.cover}
        alt={book.title}
        className="h-full w-1/2 object-fit rounded-tl-lg"
      />
      <CardHeader className="w-1/2 p-4">
        <CardTitle>
          <h3 className="text-accent-foreground">{book.title}</h3>
        </CardTitle>
        <CardContent className="text-balance p-0 h-full">
          <CardDescription className="text-justify h-3/4 overflow-auto">{book.description}</CardDescription>
          <div className="h-1/4 pt-2">
            <h5>Publicación: <span>{book.releaseDate}</span></h5>
            <h5>Páginas: <span>{book.pages}</span></h5>
            <Button className="cursor-pointer" onClick={handleToggleFav}>
              <Heart fill={`${favs.includes(book.index) ? 'currentColor': 'none'}`}/>
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
