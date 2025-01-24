"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/monitoring", label: "Monitoring" },
  { href: "/reports", label: "Reports" },
  { href: "/pools", label: "Pools" },
  { href: "/equipment", label: "Equipment" }
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <header className="bg-[#001529] border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-bold">
              AquaMonitor
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white">English</button>
            <button className="text-gray-300 hover:text-white">VSbvk1967</button>
          </div>
        </div>
      </div>
    </header>
  )
} 