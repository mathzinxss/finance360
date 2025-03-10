"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TransactionTable } from "@/components/transaction-table"
import { Search } from "lucide-react"

// Dados simulados
const mockTransactions = [
  {
    id: "1",
    description: "Uber 063015 SFPOOL",
    amount: 5.4,
    status: "Success",
    date: "Qua, Abr 24, 12:00 AM",
    channel: "Online",
    category: "Travel",
  },
  {
    id: "2",
    description: "United Airlines",
    amount: -500.0,
    status: "Success",
    date: "Seg, Abr 22, 12:00 AM",
    channel: "In Store",
    category: "Travel",
  },
  {
    id: "3",
    description: "McDonalds",
    amount: 12.0,
    status: "Success",
    date: "Dom, Abr 21, 12:00 AM",
    channel: "In Store",
    category: "Food and Drink",
  },
  {
    id: "4",
    description: "Starbucks",
    amount: 4.33,
    status: "Success",
    date: "Dom, Abr 21, 12:00 AM",
    channel: "In Store",
    category: "Food and Drink",
  },
  {
    id: "5",
    description: "SparkFun",
    amount: 89.4,
    status: "Success",
    date: "Sáb, Abr 20, 12:00 AM",
    channel: "In Store",
    category: "Food and Drink",
  },
  {
    id: "6",
    description: "Uber 072515 SFPOOL",
    amount: 6.33,
    status: "Success",
    date: "Dom, Abr 7, 12:00 AM",
    channel: "Online",
    category: "Travel",
  },
  {
    id: "7",
    description: "Uber 063015 SFPOOL",
    amount: 5.4,
    status: "Success",
    date: "Seg, Mar 25, 12:00 AM",
    channel: "Online",
    category: "Travel",
  },
  {
    id: "8",
    description: "United Airlines",
    amount: -500.0,
    status: "Success",
    date: "Sáb, Mar 23, 12:00 AM",
    channel: "In Store",
    category: "Travel",
  },
  {
    id: "9",
    description: "McDonalds",
    amount: 12.0,
    status: "Success",
    date: "Sex, Mar 22, 12:00 AM",
    channel: "In Store",
    category: "Food and Drink",
  },
]

export default function TransactionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedChannel, setSelectedChannel] = useState("")

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "" || transaction.category === selectedCategory
    const matchesStatus = selectedStatus === "" || transaction.status === selectedStatus
    const matchesChannel = selectedChannel === "" || transaction.channel === selectedChannel

    return matchesSearch && matchesCategory && matchesStatus && matchesChannel
  })

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Histórico de Transações</h1>
      <p className="text-gray-500 mb-6">Veja os detalhes do seu banco e transações.</p>

      <Card className="mb-8">
        <CardHeader className="bg-blue-500 text-white">
          <CardTitle className="text-xl">Plaid Checking</CardTitle>
          <p className="text-sm">Plaid Gold Standard 3% Interest Checking</p>
          <p className="text-sm">•••• •••• •••• 0000</p>
        </CardHeader>
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Saldo atual</p>
            <p className="text-3xl font-bold">R$110,00</p>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar transações..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            <SelectItem value="Travel">Viagem</SelectItem>
            <SelectItem value="Food and Drink">Alimentação</SelectItem>
            <SelectItem value="Transfer">Transferência</SelectItem>
            <SelectItem value="Payment">Pagamento</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="Success">Concluído</SelectItem>
            <SelectItem value="Processing">Processando</SelectItem>
            <SelectItem value="Failed">Falhou</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger>
            <SelectValue placeholder="Canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os canais</SelectItem>
            <SelectItem value="Online">Online</SelectItem>
            <SelectItem value="In Store">Na Loja</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <TransactionTable transactions={filteredTransactions} />
        </CardContent>
      </Card>
    </div>
  )
}

