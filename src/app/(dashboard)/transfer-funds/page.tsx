"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard } from "lucide-react"

export default function TransferFundsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    sourceBank: "",
    transferNote: "",
    recipientEmail: "",
    accountNumber: "",
    amount: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulação de envio
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Transferência enviada com sucesso!",
        description: `R$${formData.amount} foram transferidos.`,
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar transferência",
        description: "Ocorreu um erro ao processar sua transferência.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Transferência de Pagamento</h1>
      <p className="text-gray-500 mb-6">
        Por favor, forneça detalhes específicos ou notas relacionadas à transferência de pagamento
      </p>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sourceBank">Selecione o Banco de Origem</Label>
              <p className="text-sm text-gray-500">Selecione a conta bancária da qual deseja transferir fundos</p>
              <Select
                value={formData.sourceBank}
                onValueChange={(value) => handleSelectChange("sourceBank", value)}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma conta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plaid-checking">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Plaid Checking</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="plaid-saving">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Plaid Saving</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transferNote">Nota de Transferência (Opcional)</Label>
              <p className="text-sm text-gray-500">
                Por favor, forneça informações adicionais ou instruções relacionadas à transferência
              </p>
              <Textarea
                id="transferNote"
                name="transferNote"
                placeholder="Escreva uma nota curta aqui"
                value={formData.transferNote}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Detalhes da conta bancária</h3>
              <p className="text-sm text-gray-500">Insira os detalhes da conta bancária do destinatário</p>

              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Email do Destinatário</Label>
                <Input
                  id="recipientEmail"
                  name="recipientEmail"
                  type="email"
                  placeholder="ex: joaosilva@gmail.com"
                  value={formData.recipientEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Número da Conta Plaid Compartilhável</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  placeholder="Digite o número da conta pública"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Valor</Label>
                <Input
                  id="amount"
                  name="amount"
                  placeholder="ex: 5,00"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
              {isLoading ? "Processando..." : "Transferir Fundos"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

