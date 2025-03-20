"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Users, TrendingUp, Activity } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      name: "Top Users",
      href: "/top-users",
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: "Trending Posts",
      href: "/trending-posts",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      name: "Feed",
      href: "/feed",
      icon: <Activity className="h-4 w-4" />,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Social Media Analytics</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60",
                )}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <nav className="flex items-center justify-between md:hidden">
              <Link href="/" className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6" />
                <span className="font-bold">Analytics</span>
              </Link>
              <div className="flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center transition-colors hover:text-foreground/80",
                      pathname === item.href ? "text-foreground" : "text-foreground/60",
                    )}
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

