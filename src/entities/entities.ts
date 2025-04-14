import { HogwartsHouse } from "@/entities/potterApi";
import { Rol } from "@/services/auth/AuthServiceInterface";


export interface UserData {
  email?:      string;
  roles:      Rol[];
  books?:      number[];
  characters?: number[];
  spells?:     number[];
  house?:      HogwartsHouse | "";
}

export type UserEntry = Record<string, UserData>