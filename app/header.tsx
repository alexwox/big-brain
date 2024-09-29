"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { HeaderActions } from "./header-actions";

import Image from "next/image";
import Link from "next/link";
import { OrganizationSwitcher } from "@clerk/nextjs";

export function Header() {
    return (
        <div className="bg-slate-900 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex gap-24 items-center">
                    <Link href="/" className="flex items-center gap-8 text-2xl">
                        <Image
                            src="/logo.png"
                            width={40}
                            height={40}
                            className="rounded"
                            alt="an image of a brain"
                        />
                        <span className="font-bold text-xl text-white" >BIGBRAIN</span>
                    </Link>

                    <nav className="flex items-center gap-8">
                        <OrganizationSwitcher />
                        <Link href="/dashboard" className="text-white hover:text-slate-300 transition-colors font-semibold"> Dashboard</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4 w-full justify-end">
                    <ModeToggle />
                    <HeaderActions />
                </div>
            </div>
        </div>
    )
}