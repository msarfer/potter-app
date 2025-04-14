import { UserData } from "@/entities/entities"
import { Rol } from "@/services/auth/AuthServiceInterface"
import logger from "@/services/logging"
import React, { createContext, ReactNode, useEffect, useState } from "react"
import { authService } from "../services/auth/AuthService"
import { useDispatch } from "react-redux"
import { setFavs } from "@/store/features/books/booksSlice"

interface AuthContextProps {
  user: any | null
  roles: Rol[] | null
  data: UserData | null
}

export const AuthContext = createContext<AuthContextProps>({ user: null, roles: null, data: null });


interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any|null>(null)
  const [roles, setRoles] = useState<Rol[]|null>(null)
  const [data, setData] = useState<UserData|null>(null)
  const dispatch = useDispatch()
  useEffect(() => {
    const unSubscribe = authService.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        try {
          const userRoles = await authService.getUserRoles(currentUser)
          const userData = await authService.getUserData(currentUser)
          setData(userData)
          setRoles(userRoles)
          dispatch(setFavs(userData.books || []))
        } catch (error) {
          logger.error("Error al obtener los roles: " + error)
          setRoles(null)
        }
      } else {
        setRoles(null)
      }
    })

    return unSubscribe
  }, [])

  return (
    <AuthContext.Provider value={{user, roles, data}}>
      {children}
    </AuthContext.Provider>
  )

}