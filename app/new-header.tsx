'use client'

import { ModeToggle } from "@/components/ui/mode-toggle"
import { HeaderActions } from "./header-actions"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function NewHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex pl-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.png" width={32} height={32} alt="BigBrain logo" className="rounded" />
            <span className="hidden font-bold sm:inline-block">BIGBRAIN</span>
          </Link>
        </div>
        <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-4">
            <ModeToggle />
            <HeaderActions />
          </nav>
        </div>
      </div>
    </header>
  )
}