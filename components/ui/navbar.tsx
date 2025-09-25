"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

interface NavbarProps {
  items: NavItem[]
  className?: string
}

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(({ items, className }, ref) => {
  const pathname = usePathname()

  return (
    <nav ref={ref} className={cn("fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40", className)}>
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-accent min-w-0 flex-1",
                isActive && "bg-accent text-accent-foreground",
              )}
            >
              <div
                className={cn("transition-colors duration-200", isActive ? "text-primary" : "text-muted-foreground")}
              >
                {item.icon}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
})
Navbar.displayName = "Navbar"

export { Navbar }
export type { NavItem }
