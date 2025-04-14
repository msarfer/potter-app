// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getDatabase, off, onValue, ref, remove, set, update } from "firebase/database";
import { VITE_FIREBASE_API_KEY } from '@/services/config'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: "tienda-comida-1a7e2.firebaseapp.com",
  databaseURL:
    "https://tienda-comida-1a7e2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tienda-comida-1a7e2",
  storageBucket: "tienda-comida-1a7e2.firebasestorage.app",
  messagingSenderId: "1092414552129",
  appId: "1:1092414552129:web:b91dd2b90d0b1fdfb0aec0",
};

// Initialize Firebaseconst app = initializeApp(firebaseConfig);
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getDatabase(app);

export const updateRoles = async (id, roles) => {
  const rolesRef = ref(db,  `users/${id}/roles`)
  await update(rolesRef, roles)
}

export const removeUser = async (id) => {
  const userRef = ref(db, `users/${id}`)
  await remove(userRef)
}

export async function fetchFavs<T>(
  path: string,
  rejectWithValue: (value: unknown) => Record<any, any>
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const itemsRef = ref(db, path);

    onValue(
      itemsRef,
      (snapshot) => {
        const data = snapshot.val() ?? [];
        if (data) {
          resolve(data);
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
  }).catch((error) => rejectWithValue(error.message));
}

export async function updateFavs(
  path: string,
  favs: number[],
  rejectWithValue: (value: unknown) => Record<any, any>
) {
  const itemsRef = ref(db, path);
  return set(itemsRef, favs)
    .then(() => favs)
    .catch((error) => rejectWithValue(error.message));
}
