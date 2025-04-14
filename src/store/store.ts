//import booksReducer from "@/store/features/books/booksSlice";
import usersReducer from "@/store/features/users/usersSlice";
import { configureStore } from "@reduxjs/toolkit";
import booksReducer from './features/booksSlice';
import spellsReducer from "./features/spellsSlice";
const store = configureStore({
  reducer : {
    books: booksReducer,
    users: usersReducer,
    spells: spellsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store