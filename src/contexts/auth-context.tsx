"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
  firstName: string
  lastName: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (userData: SignupData) => Promise<void>
  logout: () => void
}

type SignupData = {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  postalCode: string
  dateOfBirth: string
  ssn: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const storedUser = localStorage.getItem("horizon_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirecionar com base na autenticação
    if (!isLoading) {
      const publicRoutes = ["/sign-in", "/sign-up"]
      const isPublicRoute = publicRoutes.includes(pathname)

      if (!user && !isPublicRoute) {
        router.push("/sign-in")
      } else if (user && isPublicRoute) {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    try {
      // Simulação de login (será substituído pela API real)
      setIsLoading(true)

      // Simulando uma verificação de credenciais
      if (email && password) {
        const mockUser = {
          id: "1",
          name: "Adrian",
          email: email,
          firstName: "Adrian",
          lastName: "Silva",
        }

        localStorage.setItem("horizon_user", JSON.stringify(mockUser))
        setUser(mockUser)
        router.push("/dashboard")

        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao Horizon!",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: "Email ou senha inválidos",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Ocorreu um erro ao tentar fazer login",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: SignupData) => {
    try {
      setIsLoading(true)

      // Simulação de cadastro (será substituído pela API real)
      const mockUser = {
        id: "1",
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      }

      localStorage.setItem("horizon_user", JSON.stringify(mockUser))
      setUser(mockUser)
      router.push("/dashboard")

      toast({
        title: "Cadastro realizado com sucesso",
        description: "Bem-vindo ao Horizon!",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer cadastro",
        description: "Ocorreu um erro ao tentar fazer cadastro",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("horizon_user")
    setUser(null)
    router.push("/sign-in")
    toast({
      title: "Logout realizado com sucesso",
      description: "Até logo!",
    })
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}

