"use client";

import Link from "next/link";
import { FilesIcon, NotebookPen, Search, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function SideNav() {
  const pathname = usePathname();

  const NavItems = () => (
    <ul className="space-y-8 pt-4">
      <li>
        <Link
          className={cn(
            "flex items-center gap-2 text-lg hover:text-slate-500 transition-colors",
            {
              "text-blue-500": pathname.endsWith("/search"),
            }
          )}
          href="/dashboard/search"
        >
          <Search className="h-5 w-5" />
          Search
        </Link>
      </li>
      <li>
        <Link
          className={cn(
            "flex items-center gap-2 text-lg hover:text-slate-500 transition-colors",
            {
              "text-blue-500":
                pathname === "/dashboard" || pathname.endsWith("/documents"),
            }
          )}
          href="/dashboard"
        >
          <FilesIcon className="h-5 w-5" />
          Documents
        </Link>
      </li>
      <li>
        <Link
          className={cn(
            "flex items-center gap-2 text-lg hover:text-slate-500 transition-colors",
            {
              "text-blue-500": pathname.endsWith("/notes"),
            }
          )}
          href="/dashboard/notes"
        >
          <NotebookPen className="h-5 w-5" />
          Notes
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed left-0 top-[68px] z-30">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px] pt-10">
            <nav>
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block">
        <NavItems />
      </nav>
    </>
  );
}
