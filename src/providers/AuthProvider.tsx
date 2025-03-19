import React, { createContext, ReactNode, useEffect, useState } from "react"
import { Rol } from "@/services/auth/AuthServiceInterface"
import { authService } from "../services/auth/AuthService"
import logger from "@/services/logging"

interface AuthContextProps {
  user: any | null
  roles: Rol[] | null
}

export const AuthContext = createContext<AuthContextProps>({ user: null, roles: null });


interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any|null>(null)
  const [roles, setRoles] = useState<Rol[]|null>(null)

  useEffect(() => {
    const unSubscribe = authService.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        try {
          const userRoles = await authService.getUserRoles(currentUser)
          setRoles(userRoles)
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
    <AuthContext.Provider value={{user, roles}}>
      {children}
    </AuthContext.Provider>
  )

}