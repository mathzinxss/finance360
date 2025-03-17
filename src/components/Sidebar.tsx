"use client"

import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  user: {
    name: string
    email: string
  }
}

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <section
      className="sticky left-0 top-0 hidden  md:flex h-screen flex-col justify-between border-r border-gray-200 bg-white transition-all duration-300
      md:w-[70px] lg:w-[280px] px-2 md:px-3 lg:px-4 py-6"
    >
      <div className="flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src='/icons/logoDegrade.webp' alt="" width={35} height={35}/>
          <h1 className="text-2xl font-bold text-[#000430] md:hidden lg:block">Finance360</h1>
        </Link>

        <nav className="flex flex-col mt-8 gap-1">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn(
                  "flex items-center gap-3 rounded-lg transition-colors",
                  "md:justify-center lg:justify-start",
                  "px-3 py-3",
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <div className="relative w-5 h-5 flex-shrink-0">
                  <Image
                    src={item.imgURL || "/placeholder.svg"}
                    alt={item.label}
                    fill
                    className={cn(isActive ? "brightness-0 invert" : "")}
                  />
                </div>
                <p className="text-sm font-medium md:hidden lg:block">{item.label}</p>
              </Link>
            )
          })}
        </nav>
      </div>
    </section>
  )
}

export default Sidebar

