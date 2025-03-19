import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { BookInterface } from "@/entities/potterApi"
import { useAppSelector } from "@/hooks/useRtk"
import { Heart } from "lucide-react"

export default function BooksPage() {
  const books = useAppSelector(state => state.books.books)
  
  return (
    <section className="flex flex-wrap justify-center w-full h-full gap-x-12 gap-y-4">
      {
        books.map((book) => <Book key={book.index}  book={book}/>)
      }
    </section>
  )
}

interface BookProps {
  book: BookInterface
}

export const Book = ({ book }: BookProps) => {

  const handleFav = (id: number) => {
    console.log(id)
  }

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
            <Button className="cursor-pointer" onClick={() => handleFav(book.index)}>
              <Heart fill={`${false ? 'currentColor': 'none'}`}/>
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
