
import { VITE_POTTER_BASE } from "@/services/config";
import { fetchFavs, updateFavs } from "@/services/firebase";
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";

interface BaseState<T> {
  items: T[];
  favs: number[];
  loading: boolean;
  error: SerializedError | null;
}

interface UpdateFavsInterface {
  userId: string;
  favs: number[];
}

export function createEntitySlice<T>(entityName: string, endpoint: string) {
  const initialState: BaseState<T> = {
    items: [],
    favs: [],
    loading: false,
    error: null,
  };

  const fetchEntities = createAsyncThunk(
    `${entityName}/fetch`,
    async (locale: string, { rejectWithValue }) => {
      return new Promise<T[]>((resolve, reject) => {
            return fetch(`${VITE_POTTER_BASE}/${locale}/${endpoint}`)
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

  const fetchEntitiesFavs = createAsyncThunk(
    `${entityName}/fetchFavs`,
    async (userId: string, { rejectWithValue }) => {
      return fetchFavs<number[]>(`users/${userId}/${endpoint}`, rejectWithValue).catch(
        (error) => rejectWithValue(error.message)
      );
    }
  );

  const updateEntitiesFavs = createAsyncThunk(
    `${entityName}/updateFavs`,
    async ({ userId, favs }: UpdateFavsInterface, { rejectWithValue }) => {
      return updateFavs(`users/${userId}/${endpoint}`, favs, rejectWithValue).catch(
        (error) => rejectWithValue(error.message)
      );
    }
  );

  const slice = createSlice({
    name: entityName,
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchEntities.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(fetchEntities.fulfilled, (state, action: PayloadAction<T[]> | Record<any,any>) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      });
      builder.addCase(fetchEntities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
      });
      builder.addCase(fetchEntitiesFavs.fulfilled, (state, action) => {
        state.favs = action.payload;
        state.loading = false;
        state.error = null;
      });
      builder.addCase(updateEntitiesFavs.fulfilled, (state, action: PayloadAction<number[] | Record<any, any>>) => {
        if (Array.isArray(action.payload)) {
          state.favs = action.payload;
        }
      });
    },
  });

  return {
    reducer: slice.reducer,
    fetchEntities,
    fetchEntitiesFavs,
    updateEntitiesFavs,
  };
}
