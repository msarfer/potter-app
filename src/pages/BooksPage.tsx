import { Book } from "@/components/Book";
import ErrorAlert from "@/components/ErrorAlert";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { AuthContext } from "@/providers/AuthProvider";
import { LanguageContext } from "@/providers/LanguageProvider";
import { fetchBooks, fetchBooksFavs } from "@/store/features/booksSlice";
import { useContext, useEffect } from "react";

export default function BooksPage() {
  const { items: books, error } = useAppSelector((state) => state.books);
  const { locale } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(fetchBooks(locale));
    dispatch(fetchBooksFavs(user.uid));
  }, [locale]);

  if (error) return <ErrorAlert message={error}></ErrorAlert>;
  return (
    <section className="flex flex-wrap justify-center w-full h-full gap-x-12 gap-y-4">
      {books && books.map((book) => <Book key={book.index} book={book} />)}
    </section>
  );
}
