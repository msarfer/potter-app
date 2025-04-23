import { BookInterface } from "@/entities/potterApi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { AuthContext } from "@/providers/AuthProvider";
import { updateBooksFavs } from "@/store/features/booksSlice";
import { useCallback, useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

interface BookProps {
  book: BookInterface;
}

export const Book = ({ book }: BookProps) => {
  const { favs } = useAppSelector((state) => state.books);
  const { user } = useContext(AuthContext);

  const dispatch = useAppDispatch();
  const handleToggleFav = useCallback(() => {
    const newFavs = favs.includes(book.index)
      ? favs.filter((fav) => fav !== book.index)
      : [...favs, book.index];

    dispatch(updateBooksFavs({ userId: user.uid, favs: newFavs }));
  }, [favs]);

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
          <CardDescription className="text-justify h-3/4 overflow-auto">
            {book.description}
          </CardDescription>
          <div className="h-1/4 pt-2">
            <h5>
              Publicación: <span>{book.releaseDate}</span>
            </h5>
            <h5>
              Páginas: <span>{book.pages}</span>
            </h5>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleToggleFav}
            >
              <Heart
                fill={`${favs.includes(book.index) ? "currentColor" : "none"}`}
              />
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
