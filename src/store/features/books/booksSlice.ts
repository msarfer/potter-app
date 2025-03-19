import { BookInterface } from "@/entities/potterApi"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import jsonBooks from '@/mocks/books.json'

export interface BookState {
  books: BookInterface[],
  favs: number[]
}

const initialState: BookState = {
  books: jsonBooks,
  favs: []
}

const housesSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addFav: (state, action: PayloadAction<number>) => {
      state.favs.push(action.payload)
    }
  }
})

export const { addFav } = housesSlice.actions

export default housesSlice.reducer