"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, Trash2 } from "lucide-react"
import { BankCard } from "@/components/bank-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MyBanksPage() {
  const { user } = useAuth()
  const [banks, setBanks] = useState([
    {
      id: "1",
      name: "Plaid Checking",
      balance: 110.0,
      cardNumber: "•••• •••• •••• 0000",
      expiryDate: "••/••",
      type: "checking",
    },
    {
      id: "2",
      name: "Plaid Saving",
      balance: 210.0,
      cardNumber: "•••• •••• •••• 1111",
      expiryDate: "••/••",
      type: "saving",
    },
  ])
  const [open, setOpen] = useState(false)
  const [newBank, setNewBank] = useState({
    name: "",
    type: "",
    accountNumber: "",
    routingNumber: "",
  })

  const handleAddBank = () => {
    const id = Math.random().toString(36).substring(7)
    setBanks([
      ...banks,
      {
        id,
        name: newBank.name,
        balance: 0,
        cardNumber: "•••• •••• •••• " + Math.floor(1000 + Math.random() * 9000).toString(),
        expiryDate: "••/••",
        type: newBank.type,
      },
    ])
    setNewBank({
      name: "",
      type: "",
      accountNumber: "",
      routingNumber: "",
    })
    setOpen(false)
  }

  const handleRemoveBank = (id: string) => {
    setBanks(banks.filter((bank) => bank.id !== id))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Meus Bancos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" /> Adicionar Banco
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Banco</DialogTitle>
              <DialogDescription>Preencha os detalhes da sua conta bancária abaixo.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Banco</Label>
                <Input
                  id="name"
                  value={newBank.name}
                  onChange={(e) => setNewBank({ ...newBank, name: e.target.value })}
                  placeholder="Ex: Banco do Brasil"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de Conta</Label>
                <Select value={newBank.type} onValueChange={(value) => setNewBank({ ...newBank, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Conta Corrente</SelectItem>
                    <SelectItem value="saving">Conta Poupança</SelectItem>
                    <SelectItem value="credit">Cartão de Crédito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accountNumber">Número da Conta</Label>
                <Input
                  id="accountNumber"
                  value={newBank.accountNumber}
                  onChange={(e) => setNewBank({ ...newBank, accountNumber: e.target.value })}
                  placeholder="Ex: 12345-6"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="routingNumber">Agência</Label>
                <Input
                  id="routingNumber"
                  value={newBank.routingNumber}
                  onChange={(e) => setNewBank({ ...newBank, routingNumber: e.target.value })}
                  placeholder="Ex: 1234"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddBank}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banks.map((bank, index) => (
          <Card key={bank.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <BankCard
                name={bank.name}
                balance={bank.balance}
                cardNumber={bank.cardNumber}
                expiryDate={bank.expiryDate}
                holderName={user?.name || "Usuário"}
                variant={index % 2 === 0 ? "primary" : "secondary"}
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Tipo de Conta</p>
                  <p className="font-medium">
                    {bank.type === "checking"
                      ? "Conta Corrente"
                      : bank.type === "saving"
                        ? "Conta Poupança"
                        : "Cartão de Crédito"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemoveBank(bank.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

