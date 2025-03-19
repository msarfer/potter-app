import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onValue, ref, off } from "firebase/database";
import { db } from "@/services/firebase";

interface UserInterface {
  id: string
  email: string;
  roles: Record<string, boolean>[];
}

interface UserState {
  users: UserInterface[]
}

const initialState: UserState = {
  users: []
}

interface UserInfo {
  email: string;
  roles: Record<string, boolean>[];
}

const formatRoles = (data: Record<string,UserInfo>) =>  Object.entries(data).map(([id, {email, roles}]) => ({id, email, roles}))

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  return new Promise<UserInterface[]>((resolve, reject) => {
    const itemsRef = ref(db, "users");

    onValue(
      itemsRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        if (data) {
          const users = formatRoles(data);
          resolve(users);
        } else {
          reject(new Error("No hay datos disponibles"));
        }

        off(itemsRef);
      },
      (error) => {
        console.error("Error en Firebase:", error);
        rejectWithValue(error);
      }
    );
  }).catch((error) => rejectWithValue(error));
});


export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
        state.users = action.payload;
      })
  }
});

export default menuSlice.reducer;