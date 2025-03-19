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

  
}

export const firebaseDatabaseService = new FirebaseDatabaseService();