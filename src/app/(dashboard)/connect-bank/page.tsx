"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { BanknoteIcon as Bank, Lock, Shield } from "lucide-react"

export default function ConnectBankPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [bankData, setBankData] = useState({
    bankName: "",
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBankData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step === 1 && !bankData.bankName) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, selecione um banco para continuar.",
      })
      return
    }
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulação de conexão
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Banco conectado com sucesso!",
        description: `${bankData.bankName} foi conectado à sua conta.`,
      })

      router.push("/my-banks")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao conectar banco",
        description: "Ocorreu um erro ao tentar conectar seu banco.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const banks = [
    { id: "banco-do-brasil", name: "Banco do Brasil" },
    { id: "bradesco", name: "Bradesco" },
    { id: "itau", name: "Itaú" },
    { id: "santander", name: "Santander" },
    { id: "caixa", name: "Caixa Econômica Federal" },
    { id: "nubank", name: "Nubank" },
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Conectar Banco</h1>
      <p className="text-gray-500 mb-6">Conecte sua conta bancária para gerenciar suas finanças em um só lugar.</p>

      <div className="max-w-2xl mx-auto">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Selecione seu banco</CardTitle>
              <CardDescription>Escolha o banco que você deseja conectar à sua conta Horizon.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {banks.map((bank) => (
                  <Button
                    key={bank.id}
                    variant={bankData.bankName === bank.id ? "default" : "outline"}
                    className="h-16 justify-start px-4"
                    onClick={() => setBankData({ ...bankData, bankName: bank.id })}
                  >
                    <Bank className="mr-2 h-5 w-5" />
                    <span>{bank.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="mr-2 h-4 w-4" />
                <span>Suas informações são protegidas com criptografia de ponta a ponta.</span>
              </div>
              <Button onClick={handleNext}>Próximo</Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Credenciais do Banco</CardTitle>
              <CardDescription>Insira suas credenciais de login do banco selecionado.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Nome de Usuário</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Digite seu nome de usuário do banco"
                    value={bankData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Digite sua senha do banco"
                    value={bankData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Voltar
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Conectando..." : "Conectar Banco"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}

        <div className="mt-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-2">Segurança Garantida</h3>
                <p className="text-blue-700 text-sm">
                  O Horizon utiliza criptografia de nível bancário para proteger suas informações. Nunca armazenamos
                  suas credenciais de login e utilizamos conexões seguras para acessar seus dados bancários.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

