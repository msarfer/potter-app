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
import { FormattedMessage } from "react-intl";

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
    <Card className="p-0 m-0 flex flex-row overflow-hidden w-5/12">
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
          <CardDescription className="text-justify h-2/4 overflow-auto">
            {book.description}
          </CardDescription>
          <div className="flex flex-col justify-evenly gap-4 h-1/3 mt-5">
            <h5 className="flex flex-col">
              <FormattedMessage id="books.pub" />{" "}
              <span>{book.releaseDate}</span>
            </h5>
            <h5 className=" flex flex-col">
              <FormattedMessage id="books.page" /> <span>{book.pages}</span>
            </h5>
            <Button
              variant="outline"
              className="cursor-pointer w-full"
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
