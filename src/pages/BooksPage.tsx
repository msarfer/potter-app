//import { Book } from "@/components/Book";
import ErrorAlert from "@/components/ErrorAlert";
import { Spinner } from "@/components/Spinner";
import { TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { AuthContext } from "@/providers/AuthProvider";
import { LanguageContext } from "@/providers/LanguageProvider";
import { fetchBooks, fetchBooksFavs } from "@/store/features/booksSlice";
import { Tabs, TabsContent, TabsList } from "@radix-ui/react-tabs";
import React, { Suspense, useContext, useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";

const LazyBook = React.lazy(() =>
  import("@/components/Book").then((module) => ({ default: module.Book }))
);

export default function BooksPage() {
  const { items: books, favs, error } = useAppSelector((state) => state.books);
  const { locale } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(fetchBooks(locale));
    dispatch(fetchBooksFavs(user.uid));
  }, [locale]);

  //create a variable than contains the books that are in the favs array
  const favsBooks = useMemo(
    () => books.filter((book) => favs.includes(book.index)),
    [books, favs]
  );

  if (error) return <ErrorAlert message={error}></ErrorAlert>;
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="all">
          <FormattedMessage id="tabs.all" />
        </TabsTrigger>
        <TabsTrigger value="favs">
          <FormattedMessage id="tabs.favs" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <section className="flex flex-wrap justify-around w-full h-full gap-x-1 gap-y-2 mt-8">
          <Suspense fallback={<Spinner />}>
            {books.map((item) => (
              <LazyBook key={item.index} book={item} />
            ))}
          </Suspense>
        </section>
      </TabsContent>
      <TabsContent value="favs">
        <section className="flex flex-wrap justify-around w-full h-full gap-x-1 gap-y-2 mt-8">
          <Suspense fallback={<Spinner />}>
            {favsBooks.map((item) => (
              <LazyBook key={item.index} book={item} />
            ))}
          </Suspense>
        </section>
      </TabsContent>
    </Tabs>
  );
}
