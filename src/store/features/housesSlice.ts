
import { HouseInterface } from "@/entities/potterApi";
import { VITE_POTTER_BASE } from "@/services/config";
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";

interface HousesState {
  items: HouseInterface[];
  loading: boolean;
  error: SerializedError | null;
}
const initialState: HousesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchHouses = createAsyncThunk(
  'houses/fetch',
  async (locale: string, { rejectWithValue }) => {
    return new Promise<HouseInterface[]>((resolve, reject) => {
          return fetch(`${VITE_POTTER_BASE}/${locale}/houses`)
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

const slice = createSlice({
  name: 'houses',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchHouses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHouses.fulfilled, (state, action: PayloadAction<HouseInterface[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchHouses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as SerializedError;
    });
  },
});


export default slice.reducer;