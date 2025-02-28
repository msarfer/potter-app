import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { BookInterface } from "@/entities/potterApi"
import { useAppSelector } from "@/hooks/useRtk"

export default function BooksPage() {
  const books = useAppSelector(state => state.books.books)
  
  return (
    <section className="grid grid-cols-4 gap-x-1.5">
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
  return (
    <Card className="pt-0">
      <img
        src={book.cover}
        alt={book.title}
        className="h-[500px] object-fit rounded-t-lg"
      />
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription className="text-justify">{book.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">$199</p>
      </CardContent>
    </Card>
  )
}
