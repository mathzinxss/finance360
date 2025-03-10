import Link from "next/link"
import { Diamond } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Diamond className="h-6 w-6 text-blue-600" />
      <span className="text-xl font-bold text-slate-900">Horizon</span>
    </Link>
  )
}

