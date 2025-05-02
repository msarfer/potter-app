import { HogwartsHouse } from "@/entities/potterApi";
import { db } from "@/services/firebase";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onValue, ref, set } from "firebase/database";

interface HouseState {
  house: HogwartsHouse | "";
}

const initialState: HouseState = {
  house: "",
};

export const fetchUserHouse = createAsyncThunk(
  "house/fetch",
  async (id: string, { rejectWithValue }) => {
    return new Promise<HogwartsHouse>((resolve, reject) => {
      const itemsRef = ref(db, `users/${id}/house`);

      onValue(
        itemsRef,
        (snapshot) => {
          const house = snapshot.val();

          if (house) {
            resolve(house);
          } else {
            reject("");
          }
        },
        (error) => {
          console.error("Error en Firebase:", error);
          rejectWithValue(error);
        }
      );
    }).catch((error) => rejectWithValue(error));
  }
);

export const updateUserHouse = createAsyncThunk(
  `house/updateUserHouse`,
  async (
    { userId, house }: { userId: string; house: string },
    { rejectWithValue }
  ) => {
    const itemsRef = ref(db, `users/${userId}/house`);
    return set(itemsRef, house)
      .then(() => house)
      .catch((error) => rejectWithValue(error.message));
  }
);
export const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    clearHouse: (state) => {
      state.house = ""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserHouse.fulfilled, (state, action: PayloadAction<HogwartsHouse>) => {
      state.house = action.payload
    })

    builder.addCase(updateUserHouse.fulfilled, (state, action: PayloadAction<string>) => {
      state.house = action.payload as HogwartsHouse;
    })
  },
});

export const { clearHouse } = houseSlice.actions

export default houseSlice.reducer