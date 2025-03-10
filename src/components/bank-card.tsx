import { Card } from "@/components/ui/card"
import { Wifi } from "lucide-react"

interface BankCardProps {
  name: string
  balance: number
  cardNumber: string
  expiryDate: string
  holderName: string
  variant?: "primary" | "secondary"
}

export function BankCard({ name, balance, cardNumber, expiryDate, holderName, variant = "primary" }: BankCardProps) {
  const bgColor = variant === "primary" ? "bg-blue-500" : "bg-blue-600"

  return (
    <Card className={`${bgColor} text-white p-4 rounded-xl relative overflow-hidden`}>
      <div className="absolute top-4 right-4">
        <Wifi className="h-6 w-6 text-white/70" />
      </div>
      <div className="mb-6">
        <h3 className="font-medium">{name}</h3>
        <p className="text-xl font-bold">R${balance.toFixed(2)}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm opacity-80">{cardNumber}</p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs opacity-70">TITULAR</p>
          <p className="text-sm">{holderName}</p>
        </div>
        <div>
          <p className="text-xs opacity-70">VALIDADE</p>
          <p className="text-sm">{expiryDate}</p>
        </div>
        <div className="w-10">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <circle cx="24" cy="24" r="20" fill="#EB001B" fillOpacity="0.8" />
            <circle cx="34" cy="24" r="20" fill="#F79E1B" fillOpacity="0.8" />
          </svg>
        </div>
      </div>
    </Card>
  )
}

