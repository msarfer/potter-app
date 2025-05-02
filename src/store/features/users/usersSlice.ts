import { UserEntry } from "@/entities/entities";
import { db } from "@/services/firebase";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { off, onValue, ref } from "firebase/database";

interface UserInterface {
  id: string
  email: string;
  roles: Record<string, boolean>[];
}

interface UserState {
  users: UserInterface[],
  user: UserEntry | null;
}

const initialState: UserState = {
  users: [],
  user: null,
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

export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async (uid: string, { rejectWithValue }) => {
    return new Promise<UserEntry>((resolve, reject) => {
      const itemsRef = ref(db, `users/${uid}`);
      onValue(
        itemsRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const user = { id: uid, ...data };
            resolve(user);
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
  }
);


export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
        state.users = action.payload;
      })
    
    builder.addCase(
      fetchUserData.fulfilled,
      (state, action: PayloadAction<UserEntry>) => {
        const user = action.payload;
        state.user = user;
      })
  }
});

export default menuSlice.reducer;