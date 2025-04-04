import { BookInterface } from "@/entities/potterApi";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { VITE_POTTER_BASE } from "@/services/config";

export interface BookState {
  books: BookInterface[];
  favs: number[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState: BookState = {
  books: [],
  favs: [],
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  "books/fetch",
  async (locale: string, { rejectWithValue }) => {
    return new Promise<BookInterface[]>((resolve, reject) => {
      return fetch(`${VITE_POTTER_BASE}/${locale}/books`)
        .then((response) => {
          if (!response.ok) {
            reject(new Error(`Failed to fetch, status code: [${response.status}]`));
          }else {
            return response.json();
          }
        })
        .then((books) => resolve(books))
        .catch((error) => rejectWithValue(error.message));
    }).catch((error) => rejectWithValue(error.message));
  }
);

const housesSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addFav: (state, action: PayloadAction<number>) => {
      const aux = [...state.favs];
      aux.push(action.payload);
      state.favs = aux;
      console.log(state.favs);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchBooks.fulfilled,
      (state, action: PayloadAction<BookInterface[]>) => {
        state.books = action.payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(
      fetchBooks.rejected,
      (state, action: PayloadAction<SerializedError>) => {
        console.log(action)
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { addFav } = housesSlice.actions;

export default housesSlice.reducer;
