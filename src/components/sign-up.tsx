"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { signUp, getLoggedInUser } from "@/lib/actions/user.actions"
import { authFormSchema } from "@/lib/utils"

import * as React from "react"
import { CalendarIcon } from "lucide-react";


const formSchema = authFormSchema("sign-up")

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getLoggedInUser()

      if (user) {
        router.push("/")
      } else {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address1!,
        city: data.city!,
        state: data.state!,
        postalCode: data.postalCode!,
        dateOfBirth: data.dateOfBirth!,
        ssn: data.ssn!,
        email: data.email,
        password: data.password,
      }

      const newUser = await signUp(userData)

      if (newUser) {
        router.push("/")
      } else {
        form.setError("email", {
          type: "manual",
          message: "Este email já pode estar em uso. Tente outro.",
        })
      }
    } catch (error) {
      console.log(error)
      form.setError("root", {
        type: "manual",
        message: "Ocorreu um erro ao criar sua conta. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Loader2 size={30} className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Crie uma conta</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Preencha os campos abaixo para criar sua conta
              </p>
            </div>

            <div className="grid gap-6">
              {form.formState.errors.root && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {form.formState.errors.root.message}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <FormControl>
                        <Input id="firstName" placeholder="João" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <FormControl>
                        <Input id="lastName" placeholder="Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full relative">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <Label htmlFor="dateOfBirth" className="text-lg font-semibold">
                        Data de Nascimento
                      </Label>
                      <FormControl>
                        <div className="relative w-full">
                          {/* Ícone dentro do input */}
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <CalendarIcon />
                          </span>
                          {/* Input com Máscara */}
                          <Input
                            placeholder="DD/MM/AAAA"
                            className="w-full pl-10 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input id="email" type="email" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <FormControl>
                      <Input id="password" type="password" placeholder="Mínimo 8 caracteres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Carregando...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">Ou continue com</span>
              </div>

              <Button variant="outline" className="w-full" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                Criar conta com GitHub
              </Button>
            </div>

            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Faça login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

