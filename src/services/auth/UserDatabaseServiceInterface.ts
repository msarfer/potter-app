import { Rol } from "./AuthServiceInterface";

export default interface UserDatabaseServiceInterface {
  getUserRoles(uid: string): Promise<Rol[]>
  setUserRoles(uid: string, {email, roles}: {email:string, roles: Rol[]}): Promise<void>
}