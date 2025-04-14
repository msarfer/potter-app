// booksSlice.ts
import { BookInterface } from "@/entities/potterApi";
import { createEntitySlice } from "./createEntitySlice";

const {
  reducer: booksReducer,
  fetchEntities: fetchBooks,
  fetchEntitiesFavs: fetchBooksFavs,
  updateEntitiesFavs: updateBooksFavs,
} = createEntitySlice<BookInterface>("books", "books");

export { fetchBooks, fetchBooksFavs, updateBooksFavs };
export default booksReducer;