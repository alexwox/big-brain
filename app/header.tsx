"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { HeaderActions } from "./header-actions";
import { LayoutDashboard } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className="dark:bg-slate-900 bg-slate-100 py-4 z-10 relative border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex flex-col sm:flex-row sm:gap-24 items-start sm:items-center">
          {!isSignedIn ? (
            <Link
              href="/"
              className="flex items-center gap-4 sm:gap-8 text-2xl"
            >
              <Image
                src="/logo.png"
                width={32}
                height={32}
                className="rounded sm:w-[40px] sm:h-[40px]"
                alt="an image of a brain"
              />
              <span className="font-bold text-lg sm:text-xl">BIGBRAIN</span>
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="flex items-center gap-4 sm:gap-8 text-2xl"
            >
              <Image
                src="/logo.png"
                width={32}
                height={32}
                className="rounded sm:w-[40px] sm:h-[40px]"
                alt="an image of a brain"
              />
              <span className="font-bold text-lg sm:text-xl">BIGBRAIN</span>
            </Link>
          )}

          {isSignedIn && (
            <nav className="flex items-center gap-8">
              <div className="hidden sm:block">
                <OrganizationSwitcher />
              </div>
              <Link
                href="/dashboard"
                className="hover:text-slate-300 transition-colors font-semibold hidden sm:block"
              >
                Dashboard
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {isSignedIn && (
            <Link
              href="/dashboard"
              className="sm:hidden hover:text-slate-300 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
            </Link>
          )}
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
