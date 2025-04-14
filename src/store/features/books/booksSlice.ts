import { BookInterface } from "@/entities/potterApi";
import { VITE_POTTER_BASE } from "@/services/config";
import { fetchFavs, updateFavs } from "@/services/firebase";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

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
            reject(
              new Error(`Failed to fetch, status code: [${response.status}]`)
            );
          } else {
            return response.json();
          }
        })
        .then((books) => resolve(books))
        .catch((error) => rejectWithValue(error.message));
    }).catch((error) => rejectWithValue(error.message));
  }
);

export const fetchBooksFavs = createAsyncThunk(
  "books/fetchFavs",
  async (userId: string, { rejectWithValue }) => {
    return fetchFavs<number[]>(`users/${userId}/books`, rejectWithValue).catch(
      (error) => rejectWithValue(error.message)
    );
  }
);

interface UpdateFavsInterface {
  userId: string;
  favs: number[];
}
export const updateBooksFavs = createAsyncThunk(
  "books/updateFavs",
  async ({ userId, favs }: UpdateFavsInterface, { rejectWithValue }) => {
    console.log("update favs", userId, favs);
    return updateFavs(`users/${userId}/books`, favs, rejectWithValue).catch(
      (error) => rejectWithValue(error.message)
    );
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
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
        console.log(action);
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(fetchBooksFavs.fulfilled, (state, action) => {
      state.favs = action.payload;
      state.loading = false;
      state.error = null;
      console.log("favs", action.payload);
    });

    builder.addCase(
      updateBooksFavs.fulfilled,
      (state, action: PayloadAction<number[]>) => {
        state.favs = action.payload;
      }
    );
  },
});

//export const {} = booksSlice.actions;

export default booksSlice.reducer;
