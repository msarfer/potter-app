import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "@/services/firebase";
import { FirebaseDatabaseService } from "@/services/auth/firebase/FirebaseDatabaseService";
import { AuthServiceInterface, Rol } from "@/services/auth/AuthServiceInterface";

const auth = getAuth(app);

export class FirebaseAuthService implements AuthServiceInterface {
  private databaseService: FirebaseDatabaseService;

  constructor() {
    this.databaseService = new FirebaseDatabaseService();
  }
  signIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(auth, email, password);
  }
  signUp(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  signOut(): Promise<void> {
    return signOut(auth);
  }
  onAuthStateChanged(callback: (user: any) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }
  getCurrentUser(): any {
    return auth.currentUser;
  }

  async getUserRoles(user: any): Promise<Rol[]> {
    if (user.email === "msf91@alu.ua.es") {
      return [Rol.ADMIN];
    }

    return this.databaseService.getUserRoles(user.uid);
  }

  async getUserData(user: any): Promise<any> {
    return this.databaseService.getUserData(user.uid);
  }
}