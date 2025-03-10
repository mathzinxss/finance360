import { Card, CardContent } from "@/components/ui/card"
import { Plane, Utensils, ArrowRightLeft, CreditCard } from "lucide-react"

interface CategoryCardProps {
  icon: string
  name: string
  count: number
  color: string
  percentage: number
}

export function CategoryCard({ icon, name, count, color, percentage }: CategoryCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "plane":
        return <Plane className="h-5 w-5" />
      case "utensils":
        return <Utensils className="h-5 w-5" />
      case "exchange":
        return <ArrowRightLeft className="h-5 w-5" />
      case "credit-card":
        return <CreditCard className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  const getColorClasses = () => {
    switch (color) {
      case "green":
        return {
          bg: "bg-green-100",
          text: "text-green-600",
          progress: "bg-green-500",
        }
      case "blue":
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          progress: "bg-blue-500",
        }
      case "pink":
        return {
          bg: "bg-pink-100",
          text: "text-pink-600",
          progress: "bg-pink-500",
        }
      case "purple":
        return {
          bg: "bg-purple-100",
          text: "text-purple-600",
          progress: "bg-purple-500",
        }
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          progress: "bg-gray-500",
        }
    }
  }

  const colorClasses = getColorClasses()

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${colorClasses.bg} ${colorClasses.text}`}>{getIcon()}</div>
            <div>
              <h3 className="font-medium">{name}</h3>
            </div>
          </div>
          <div className="text-gray-500 font-medium">{count}</div>
        </div>
        <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full ${colorClasses.progress} rounded-full`} style={{ width: `${percentage}%` }} />
        </div>
      </CardContent>
    </Card>
  )
}

