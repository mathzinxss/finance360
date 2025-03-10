"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { BankCard } from "@/components/bank-card"
import { TransactionTable } from "@/components/transaction-table"
import { CategoryCard } from "@/components/category-card"
import { Landmark } from "lucide-react"

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
    description: "asdasdasd",
    amount: -10.0,
    status: "Processing",
    date: "Seg, Abr 29, 4:53 PM",
    channel: "Online",
    category: "Transfer",
  },
  {
    id: "3",
    description: "WFBSbVhMdmRtVkN6bHlx...",
    amount: -10.0,
    status: "Processing",
    date: "Seg, Abr 29, 4:57 PM",
    channel: "Online",
    category: "Transfer",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("plaid-checking")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          Bem-vindo, <span className="text-blue-500">{user?.firstName}</span>
        </h1>
        <p className="text-gray-500">Acesse e gerencie sua conta e transações de forma eficiente.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Contas Bancárias: 2</h2>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-500 mb-2">Saldo Atual Total</div>
                <div className="text-4xl font-bold">R$320,00</div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Transações recentes</h2>
              <Button variant="outline" size="sm">
                Ver todas
              </Button>
            </div>

            <Tabs defaultValue="plaid-checking" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="plaid-checking">Plaid Checking</TabsTrigger>
                <TabsTrigger value="plaid-saving">Plaid Saving</TabsTrigger>
              </TabsList>
              <TabsContent value="plaid-checking">
                <Card>
                  <CardContent className="p-0">
                    <div className="p-4 bg-gray-50 flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-md">
                        <Landmark className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Plaid Checking</h3>
                        <p className="text-lg font-bold">R$110,00</p>
                      </div>
                      <div className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">checking</div>
                    </div>
                    <TransactionTable transactions={mockTransactions} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="plaid-saving">
                <Card>
                  <CardContent className="p-4">
                    <p>Nenhuma transação encontrada.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Meus Bancos</h2>
            <Button size="sm" variant="outline">
              <PlusIcon className="h-4 w-4 mr-1" /> Adicionar Banco
            </Button>
          </div>

          <div className="space-y-4">
            <BankCard
              name="Plaid Checking"
              balance={110.0}
              cardNumber="•••• •••• •••• 0000"
              expiryDate="••/••"
              holderName={user?.name || "Usuário"}
            />
            <BankCard
              name="Plaid Saving"
              balance={210.0}
              cardNumber="•••• •••• •••• 1111"
              expiryDate="••/••"
              holderName={user?.name || "Usuário"}
              variant="secondary"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Principais categorias</h2>
            <div className="space-y-3">
              <CategoryCard icon="plane" name="Viagem" count={9} color="green" percentage={75} />
              <CategoryCard icon="utensils" name="Alimentação" count={9} color="blue" percentage={65} />
              <CategoryCard icon="exchange" name="Transferência" count={6} color="pink" percentage={50} />
              <CategoryCard icon="credit-card" name="Pagamento" count={3} color="purple" percentage={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

