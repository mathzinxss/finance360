import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Transaction {
  id: string
  description: string
  amount: number
  status: string
  date: string
  channel: string
  category: string
}

interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "travel":
        return "bg-green-100 text-green-800"
      case "food and drink":
        return "bg-blue-100 text-blue-800"
      case "transfer":
        return "bg-rose-100 text-rose-800"
      case "payment":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transação</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Canal</TableHead>
          <TableHead>Categoria</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.description}</TableCell>
            <TableCell className={`text-right ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
              {transaction.amount < 0 ? "-" : ""}R${Math.abs(transaction.amount).toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={getStatusColor(transaction.status)}>
                {transaction.status === "Processing" ? "Processando" : transaction.status}
              </Badge>
            </TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.channel}</TableCell>
            <TableCell>
              <Badge variant="outline" className={getCategoryColor(transaction.category)}>
                {transaction.category === "Travel"
                  ? "Viagem"
                  : transaction.category === "Food and Drink"
                    ? "Alimentação"
                    : transaction.category === "Transfer"
                      ? "Transferência"
                      : transaction.category === "Payment"
                        ? "Pagamento"
                        : transaction.category}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

