import { get, getDatabase, ref, set } from "firebase/database";
import { Rol } from "@/services/auth/AuthServiceInterface";
import UserDatabaseServiceInterface from "@/services/auth/UserDatabaseServiceInterface";
import { app } from "@/services/firebase";

export class FirebaseDatabaseService implements UserDatabaseServiceInterface {
  constructor() {
    
  }
  async setUserRoles(uid: string, { email, roles }: { email: string; roles: Rol[]; }): Promise<void> {
    const db = getDatabase(app);
    const userRef = ref(db, `users/${uid}`);
    
    const rolesData: { [key: string]: boolean } = {};
    Object.values(Rol).forEach(rol => rolesData[rol.toUpperCase()] = false)
    roles.forEach(role => {
      rolesData[role.toUpperCase()] = true;
    });

    await set(userRef, { email, roles: rolesData });
  }

  async restoreUserAppData(uid: string): Promise<void> {
    const db = getDatabase(app);
    const data = {
      "books": [],
      "characters": [],
      "spells": [],
      "house": ""
    }
    Object.entries(data).forEach(([key, value]) => {
      const userRef = ref(db, `users/${uid}/${key}`);
      set(userRef, value);
    });
  }

  async getUserRoles(uid: string): Promise<Rol[]> {
    const db = getDatabase(app)
    const rolesRef = ref(db, `users/${uid}/roles`)
    const snapshot = await get(rolesRef)

    if (snapshot.exists()) {
      const data = snapshot.val()
      const roles: Rol[] = []
      
      
      const entries = Object.entries(data)
      entries.forEach(([key, value]) => {
        if(value) roles.push(key as Rol)
      });

      return roles
    }

    return [Rol.USER]
  }

  async getUserData(uid: string): Promise<unknown> {  
    const db = getDatabase(app)
    const userRef = ref(db, `users/${uid}`)
    const snapshot = await get(userRef)
    if (!snapshot.exists()) {
      return null
    }
    const roles = await this.getUserRoles(uid)
    const data = snapshot.val()
    data["roles"] = roles
    return data
  }

  
}

export const firebaseDatabaseService = new FirebaseDatabaseService();